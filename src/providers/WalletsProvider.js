import {createContext, useCallback, useContext} from "react";
import {EVENT_TYPE, SUBSCRIPTION_TYPE, useBackground, useBackgroundSubscription} from "./BackgroundProvider";
import {useAccount} from "./AccountProvider";
import {AccountType} from "@tonclient/appkit";

const WalletsContext = createContext();

export const useWallets = () => {
    return useContext(WalletsContext);
}

export const getHDPathByIndex = index => `m/44'/396'/0'/0/${index}`;
export const getIndexByHDPath = HDPath => {
    const matched = HDPath.match(/m\/44'\/396'\/0'\/0\/([0-9]+)/);
    return matched && parseInt(matched[1]);
};

const WalletsProvider = ({children}) => {
    const {wallets} = useAccount();
    const {activeWallet} = useBackgroundSubscription(SUBSCRIPTION_TYPE.WALLET, {});
    const {executeBackground} = useBackground();

    const activateWallet = useCallback(async ({hdPath, passcode}) => {
        return await executeBackground(EVENT_TYPE.WALLET_ACTIVATE, {
            hdPath,
            passcode,
        });
    }, [executeBackground]);

    const providerValue = {
        activeWallet: activeWallet && {
            ...activeWallet,
            initialized: activeWallet.acc_type === AccountType.active
        },
        wallets,
        activateWallet
    };

    return (
        <WalletsContext.Provider value={providerValue}>
            {children}
        </WalletsContext.Provider>
    )
};

export default WalletsProvider;
