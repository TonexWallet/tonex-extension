import React, {useCallback, useContext} from "react";
import {EVENT_TYPE, SUBSCRIPTION_TYPE, useBackground, useBackgroundSubscription} from "./BackgroundProvider";

// eslint-disable-next-line react-hooks/rules-of-hooks
const TonProviderContext = React.createContext({});

export const useTon = () => {
    return useContext(TonProviderContext);
};

export const AvailableNetworks = [
    'rustnet.ton.dev',
    'net.ton.dev',
    'main.ton.dev',
    'fld.ton.dev',
];

const TonProvider = ({children}) => {
    const {network, availableNetworks} = useBackgroundSubscription(SUBSCRIPTION_TYPE.TON, {});

    const {executeBackground} = useBackground();

    const changeNetwork = useCallback(async(network) => {
        return await executeBackground(EVENT_TYPE.TON_SET_NETWORK, {network});
    }, [executeBackground]);

    return (
        <TonProviderContext.Provider value={{
            network,
            availableNetworks,
            changeNetwork
        }}>
            {children}
        </TonProviderContext.Provider>
    )
};

export default TonProvider;
