import React, {useCallback, useContext} from "react";
import {EVENT_TYPE, SUBSCRIPTION_TYPE, useBackground, useBackgroundSubscription} from "./BackgroundProvider";

// eslint-disable-next-line react-hooks/rules-of-hooks
const TonProviderContext = React.createContext({});

export const useTon = () => {
    return useContext(TonProviderContext);
};

export const AvailableNetworks = [
    'net.ton.dev',
    'main.ton.dev',
    'fld.ton.dev',
    'rustnet.ton.dev',
];

const TonProvider = ({children}) => {
    const {network, availableNetworks} = useBackgroundSubscription(SUBSCRIPTION_TYPE.TON, {});

    const {sendMessage} = useBackground();

    const changeNetwork = useCallback((network) => {
        sendMessage(EVENT_TYPE.TON_SET_NETWORK, {network});
    }, [sendMessage]);

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
