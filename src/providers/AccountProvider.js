import {createContext, useCallback, useContext} from "react";
import {EVENT_TYPE, SUBSCRIPTION_TYPE, useBackground, useBackgroundSubscription} from "./BackgroundProvider";

const AccountProviderContext = createContext({});

export const useAccount = () => {
    return useContext(AccountProviderContext);
};

export const SEED_PHRASE_WORD_COUNT = 12;
export const SEED_PHRASE_DICTIONARY_ENGLISH = 1;

const AccountProvider = ({children}) => {
    const account = useBackgroundSubscription(SUBSCRIPTION_TYPE.ACCOUNT);

    const {executeBackground} = useBackground();

    const createAccount = useCallback(async ({seedPhrase, passcode}) => {
        return await executeBackground(EVENT_TYPE.ACCOUNT_CREATE, {
            seedPhrase,
            passcode,
        });
    }, [executeBackground]);

    const generateSeedPhrase = useCallback(async (passcode) => {
        const {seedPhrase} = await executeBackground(EVENT_TYPE.ACCOUNT_GENERATE_SEED_PHRASE);

        return seedPhrase;
    }, [executeBackground]);

    const lockAccount = useCallback(async(passcode) => {
        await executeBackground(EVENT_TYPE.ACCOUNT_LOCK, {
            passcode
        });
    }, [executeBackground]);

    const unlockAccount = useCallback(async(passcode) => {
        await executeBackground(EVENT_TYPE.ACCOUNT_UNLOCK, {
            passcode
        });
    }, [executeBackground]);

    const removeAccount = useCallback(async() => {
        return await executeBackground(EVENT_TYPE.ACCOUNT_REMOVE);
    }, [executeBackground])

    const getSeedPhrase = useCallback(async(passcode) => {
        return await executeBackground(EVENT_TYPE.ACCOUNT_GET_SEED_PHRASE, {
            passcode
        });
    }, [executeBackground]);

    return (
        <AccountProviderContext.Provider value={{
            initialized: account?.initialized,
            locked: account?.locked,
            wallets: account?.wallets,
            createAccount,
            generateSeedPhrase,
            lockAccount,
            unlockAccount,
            removeAccount,
            getSeedPhrase
        }}>
            {account && children}
        </AccountProviderContext.Provider>
    )
};

export default AccountProvider;
