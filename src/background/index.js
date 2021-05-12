/* eslint-disable */
import getLibWeb from "./libweb";
import {abiContract, signerKeys, signerNone, TonClient} from "@tonclient/core";
import {EVENT_ERRORS, EVENT_TYPE, SUBSCRIPTION_TYPE} from "../providers/BackgroundProvider";
import mitt from "mitt";
import formatBalance from "../utils/formatBalance";
import shortenWalletAddress from "../utils/shortenWalletAddress";
import {SEED_PHRASE_DICTIONARY_ENGLISH, SEED_PHRASE_WORD_COUNT} from "../providers/AccountProvider";
import {decryptValue, encryptValue, getStoreValue, removeStoreValue, setStoreValue} from "./storage";
import {getHDPathByIndex, getIndexByHDPath} from "../providers/WalletsProvider";
import {Account, AccountType} from "@tonclient/appkit";
import SafeMultisigWallet from "../contracts/SafeMultisigWallet/SafeMultisigWallet";
import {AvailableNetworks} from "../providers/TonProvider";
import transferAbi from '../contracts/Transfer/transfer.abi.json';
import Big from "../lib/Big";
import watchWallet from "./walletWatcher";
import extensionApi from '../lib/ExtensionApi';

self.location.reload = () => {

};

const libWeb = getLibWeb({
    debugLog: console.log
});

TonClient.useBinaryLibrary(libWeb);

let client;

let accountState = {
    wallets: null,
    activeWalletPath: null,
}

extensionApi.runtime.onConnect.addListener(async connection => {
    const onTransaction = ({wallet, result}) => {
        const {id, src, value} = result;

        const amount = formatBalance(value, 6, false);

        registration.showNotification(`Received from ${shortenWalletAddress(src)}`, {
            body: `+${amount}`,
            data: `+${amount}`,
            icon: extensionApi.runtime.getURL("icons/128.png"),
            message: `+${amount}`,
        })
    }

    const setupTonClient = ({network}) => {
        console.log('setup client', network)
        if(!client){
            client = new TonClient( {
                network: {
                    server_address: network
                }
            });
        }
    };

    const closeConnection = () => {
        console.log('close connection')
        client.close();
        client = null;
    }

    const deriveAccount = async (passcode) => {
        const encryptedAccount = await getStoreValue('account');

        if(!encryptedAccount){
            throw new Error('Account doesnt exists')
        }

        return await decryptValue(client, {
            value: encryptedAccount,
            passcode
        });
    };

    const deriveWalletAccountByPath = async (seedPhrase, path) => {
        const keyPair = await client.crypto.mnemonic_derive_sign_keys({
            phrase: seedPhrase,
            path,
            dictionary: SEED_PHRASE_DICTIONARY_ENGLISH,
            word_count: SEED_PHRASE_WORD_COUNT,
        });

        return new Account(SafeMultisigWallet, { signer: signerKeys(keyPair), client });
    }

    const updateAccountState = async (updatedState = {}) => {

        accountState = {
            ...accountState,
            ...updatedState,
        }

        const {wallets, activeWalletPath} = accountState;
        const activeWallet = wallets && wallets.find(wallet => wallet.hdPath === activeWalletPath);

        const initialized = await getStoreValue('account');

        connection.postMessage({
            type: SUBSCRIPTION_TYPE.ACCOUNT,
            payload: {
                initialized,
                locked: initialized && wallets === null && activeWalletPath === null,
                wallets
            }
        });

        const activeWalletData = activeWallet && activeWallet.address && await watchWallet({
            client,
            wallet: activeWallet.address,
            onUpdate: activeWalletData => {
                connection && connection.postMessage({
                    type: SUBSCRIPTION_TYPE.WALLET,
                    payload: {
                        activeWallet: {
                            ...activeWallet,
                            ...activeWalletData
                        }
                    }
                });
            },
        });

        connection.postMessage({
            type: SUBSCRIPTION_TYPE.WALLET,
            payload: {
                activeWallet: activeWallet && {
                    ...activeWallet,
                    ...activeWalletData
                },
            }
        });

    };

    const getAccountWallets = async (account) => {
        const {seedPhrase = null, paths = []} = account;

        return await Promise.all(paths.map(async hdPath => {
            const wallet = await deriveWalletAccountByPath(seedPhrase, hdPath);
            const address = await wallet.getAddress();

            const info = await wallet.getAccount();

            let deployFee;

            if(info.acc_type !== AccountType.active){
                const {total_account_fees} = await wallet.calcDeployFees({
                    useGiver: true,
                    initInput: {
                        owners: [`0x${wallet.signer.keys.public}`],
                        reqConfirms: 3,
                    }
                });

                deployFee = total_account_fees;
            }

            return {
                address,
                hdPath,
                balance: info.balance,
                acc_type: info.acc_type,
                deployFee
            }
        }));
    }



    const reconnect = ({network}) => {
        closeConnection();
        setupTonClient({
            network
        });
    };

    const emitter = mitt();

    connection.onMessage.addListener(({type, payload}) => {
        emitter.emit(type, payload);
    });

    emitter.on(EVENT_TYPE.ACCOUNT_CREATE, async ({seedPhrase, passcode}) => {
        const {valid} = await client.crypto.mnemonic_verify({
            phrase: seedPhrase,
            dictionary: SEED_PHRASE_DICTIONARY_ENGLISH,
            word_count: SEED_PHRASE_WORD_COUNT,
        });

        if(!valid){
            connection.postMessage({
                type: EVENT_TYPE.ACCOUNT_CREATE,
                error: {
                    message: 'Wrong seed phrase provided!'
                }
            });

            return;
        }

        const initialWalletPath = getHDPathByIndex(0);

        const account = {
            seedPhrase,
            paths: [initialWalletPath],
            activeWalletPath: initialWalletPath
        };

        const encryptedAccount = await encryptValue(client, {
            value: account,
            passcode
        });

        await setStoreValue('account', encryptedAccount);

        connection.postMessage({
            type: EVENT_TYPE.ACCOUNT_CREATE,
            payload: {
                encryptedAccount
            }
        });

        const wallets = await getAccountWallets(account);

        await updateAccountState({
            wallets,
            activeWalletPath: initialWalletPath
        });
    });

    emitter.on(EVENT_TYPE.ACCOUNT_LOCK, async ({}) => {
        await updateAccountState({
            wallets: null,
            activeWalletPath: null
        });

        connection.postMessage({
            type: EVENT_TYPE.ACCOUNT_LOCK,
            payload: {

            }
        });
    });

    emitter.on(EVENT_TYPE.ACCOUNT_UNLOCK, async ({passcode}) => {
        try{
            let account = {};

            try{
                account = await deriveAccount(passcode);
            }catch (e){
                console.log('error', e);
            }

            const wallets = await getAccountWallets(account);
            const {activeWalletPath} = account;

            connection.postMessage({
                type: EVENT_TYPE.ACCOUNT_UNLOCK,
                payload: {}
            });

            await updateAccountState({
                wallets,
                activeWalletPath
            });
        }catch (e){
            console.log(e);
            connection.postMessage({
                type: EVENT_TYPE.ACCOUNT_UNLOCK,
                error: {
                    code: EVENT_ERRORS.ACCOUNT_UNLOCK_ERROR
                }
            });
        }
    });

    emitter.on(EVENT_TYPE.ACCOUNT_GENERATE_SEED_PHRASE, async ({}) => {
        const {phrase: seedPhrase} = await client.crypto.mnemonic_from_random({
            dictionary: SEED_PHRASE_DICTIONARY_ENGLISH,
            word_count: SEED_PHRASE_WORD_COUNT,
        });

        connection.postMessage({
            type: EVENT_TYPE.ACCOUNT_GENERATE_SEED_PHRASE,
            payload: {
                seedPhrase
            }
        });
    });

    emitter.on(EVENT_TYPE.WALLET_CREATE, async ({passcode}) => {
        const account = await deriveAccount(passcode);
        const {seedPhrase, paths} = account;
        const lastWalletPath = paths && paths.length && paths[paths.length - 1];
        const lastWalletIndex = lastWalletPath && getIndexByHDPath(lastWalletPath);
        const nextIndex = typeof lastWalletIndex === 'number' ? lastWalletIndex + 1 : 0;
        const nextHDPath = getHDPathByIndex(nextIndex);

        const wallet = await deriveWalletAccountByPath(seedPhrase, nextHDPath);

        const walletAddress = await wallet.getAddress();

        connection.postMessage({
            type: SUBSCRIPTION_TYPE.WALLET_CREATE,
            payload: {
                walletPath: nextHDPath,
                walletAddress
            }
        });

        const updatedAccount = {
            ...account,
            paths: [...account.paths, nextHDPath]
        };

        const encryptedAccount = await encryptValue(client, {
            value: updatedAccount,
            passcode
        });

        await setStoreValue('account', encryptedAccount);

        // check
        const wallets = await getAccountWallets(updatedAccount);

        await updateAccountState({
            wallets,
            activeWalletPath: nextHDPath
        });
    });

    emitter.on(EVENT_TYPE.ACCOUNT_REMOVE, async () => {
        await removeStoreValue('account');

        await updateAccountState({
            wallets: [],
            activeWalletPath: null
        });

        connection.postMessage({
            type: EVENT_TYPE.ACCOUNT_REMOVE,
            payload: {}
        });
    });

    emitter.on(EVENT_TYPE.WALLET_ACTIVATE, async ({hdPath, passcode}) => {
        const {seedPhrase} = await deriveAccount(passcode);
        const account = await deriveWalletAccountByPath(seedPhrase, hdPath);
        const address = await account.getAddress();

        let info;

        try {
            info = await account.getAccount();
        } catch (err) {
            connection.postMessage({
                type: EVENT_TYPE.WALLET_ACTIVATE,
                error: {
                    message: `Account with address ${address} doesn't exist`
                }
            })
            return;
        }

        if (info.acc_type === AccountType.active) {
            connection.postMessage({
                type: EVENT_TYPE.WALLET_ACTIVATE,
                error: {
                    message: 'Account already activated'
                }
            })
            return;
        }

        const response = await account.deploy({
            initInput: {
                owners: [`0x${account.signer.keys.public}`],
                reqConfirms: 3,
            },
        });

        connection.postMessage({
            type: EVENT_TYPE.WALLET_ACTIVATE,
            payload: {
                response
            }
        });
    });

    emitter.on(EVENT_TYPE.TRANSACTION_SEND, async ({recipient, memo = '', amount, walletHDPath, passcode}) => {
        const {seedPhrase} = await deriveAccount(passcode);
        const account = await deriveWalletAccountByPath(seedPhrase, walletHDPath);
        amount = new Big(amount).mul(new Big(1_000_000_000)).toString();

        const body = memo === '' ? memo : (await client.abi.encode_message_body({
            abi: abiContract(transferAbi),
            call_set: {
                function_name: "transfer",
                input: {
                    comment: Buffer.from(memo).toString("hex"),
                },
            },
            is_internal: true,
            signer: signerNone(),
        })).body;

        const transactionInfo = (await account.run("submitTransaction", {
            dest: recipient,
            value: amount,
            bounce: false,
            allBalance: false,
            payload: body,
        }));

        console.log('transaction sent', transactionInfo)
        // const messages = transactionInfo.out_messages;

        connection && connection.postMessage({
            type: EVENT_TYPE.TRANSACTION_SEND,
            payload: {
                transactionInfo
            }
        });
    });

    emitter.on(EVENT_TYPE.WALLET_SWITCH, async ({hdPath}) => {
        await updateAccountState({
            activeWalletPath: hdPath
        });

        connection.postMessage({
            type: EVENT_TYPE.WALLET_SWITCH,
            payload: {}
        });
    });

    emitter.on(EVENT_TYPE.ACCOUNT_GET_SEED_PHRASE, async ({passcode}) => {
        try{
            const {seedPhrase} = await deriveAccount(passcode);
            connection.postMessage({
                type: EVENT_TYPE.ACCOUNT_GET_SEED_PHRASE,
                payload: {
                    seedPhrase
                }
            });
        }catch (e){
            connection.postMessage({
                type: EVENT_TYPE.ACCOUNT_GET_SEED_PHRASE,
                error: {
                    message: 'Wrong passcode provided.'
                }
            });
        }
    });

    emitter.on(EVENT_TYPE.TON_SET_NETWORK, async ({network}) => {
        await setStoreValue('network', network);

        reconnect({
            network
        });

        await updateAccountState({});

        connection.postMessage({
            type: EVENT_TYPE.TON_SET_NETWORK,
            payload: {
                network
            }
        });

        console.log('changed network to', network)

        connection.postMessage({
            type: SUBSCRIPTION_TYPE.TON,
            payload: {
                network,
                availableNetworks: AvailableNetworks
            }
        });
    });

    connection.onDisconnect.addListener( () => {
        console.log('Disconnect');
        connection = null;
    });

    const activeNetwork = await getStoreValue('network') || AvailableNetworks[0];

    setupTonClient({network: activeNetwork});

    connection.postMessage({
        type: SUBSCRIPTION_TYPE.TON,
        payload: {
            network: activeNetwork,
            availableNetworks: AvailableNetworks
        }
    });

    connection.postMessage({
        type: SUBSCRIPTION_TYPE.BACKGROUND,
        payload: {
            isReady: true
        }
    });

    await updateAccountState({});
});

extensionApi.runtime.onStartup.addListener(async () => {

});

extensionApi.runtime.onInstalled.addListener(async () => {

});
