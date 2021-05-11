import {createContext, useCallback, useContext, useEffect, useRef, useState} from 'react';
import mitt from 'mitt';

const BackgroundProviderContext = createContext({});

export const useBackground = () => {
    return useContext(BackgroundProviderContext);
};

export const EVENT_TYPE = {
    UPDATE_STORE: 'updateStore',
    RECONNECT_TON_CLIENT: 'setupTonClient',
    ACTIVE_WALLET_UPDATE: 'activeWalletUpdate',
    TON_SET_NETWORK: 'ton/setNetwork',
    ACCOUNT_CREATE: 'account/create',
    ACCOUNT_UNLOCK: 'account/unlock',
    ACCOUNT_LOCK: 'account/lock',
    ACCOUNT_REMOVE: 'account/remove',
    ACCOUNT_GENERATE_SEED_PHRASE: 'account/generateSeedPhrase',
    WALLET_CREATE: 'wallet/create',
    WALLET_ACTIVATE: 'wallet/activate',
    TRANSACTION_SEND: 'wallet/sendTransaction'
};

export const SUBSCRIPTION_TYPE = {
    BACKGROUND: 'background',
    TON: 'ton',
    ACCOUNT: 'account',
    WALLET: 'wallet',
};

export const EVENT_ERRORS = {
    SEED_PHRASE_CONFIRMATION_ERROR: 'SEED_PHRASE_CONFIRMATION_ERROR',
    ACCOUNT_UNLOCK_ERROR: 'ACCOUNT_UNLOCK_ERROR'
};

export const useBackgroundSubscription = (event, initialValue = null) => {
    const [payloadState, setPayloadState] = useState(initialValue);
    const {subscribe, unsubscribe, executeBackground} = useBackground();

    useEffect(() => {
        console.log('subscribe', event)
        subscribe(event, ({payload, error}) => {
            if(error){
                console.log('Error', error)
            }else{
                setPayloadState(payload);
            }
        });

        executeBackground(event).then(initialPayload => {
            setPayloadState(initialPayload);
        });

        return () => {
            console.log('unsubscribe', event)

            unsubscribe(event);
        };
    }, [event, executeBackground, subscribe, unsubscribe]);

    return payloadState;
};

const BackgroundProvider = ({children}) => {
    const connectionRef = useRef(null);
    const backgroundEmitterRef = useRef();
    const [backgroundState, setBackgroundState] = useState({});
    const {isReady} = backgroundState;

    const sendMessage = useCallback((type, payload) => {
        if(!connectionRef.current){
            throw new Error('Background connection is not established');
        }

        connectionRef.current.postMessage({
            type,
            payload
        });
    }, []);

    const subscribe = useCallback((subscription, cb) => {
        backgroundEmitterRef.current.on(subscription, cb);
    }, []);

    const unsubscribe = useCallback((subscription) => {
        backgroundEmitterRef.current.off(subscription);
    }, []);

    const connect = useCallback(() => {
        backgroundEmitterRef.current = mitt();
        connectionRef.current = window.chrome.runtime.connect({name: 'tonexPopup'});

        connectionRef.current.onMessage.addListener(({type, payload, error}) => {
            console.log('event', type, payload);
            backgroundEmitterRef.current.emit(type, {
                payload,
                error
            });
        });

        subscribe(SUBSCRIPTION_TYPE.BACKGROUND, ({payload}) => {
            setBackgroundState(payload);
        });
    }, [subscribe]);

    const executeBackground = useCallback((type, payload = {}) => {
        sendMessage(type, payload);

        return new Promise((resolve, reject) => {
            subscribe(type, ({payload, error}) => {
                if(error){
                    reject(error);
                }else{
                    resolve(payload);
                }
                unsubscribe(type);
            });
        })
    }, [sendMessage, subscribe, unsubscribe]);

    useEffect(() => {
        connect();

        return () => {
            unsubscribe(SUBSCRIPTION_TYPE.BACKGROUND);
        }
    }, [connect, unsubscribe]);

    return (
        <BackgroundProviderContext.Provider value={{
            isReady,
            subscribe,
            unsubscribe,
            executeBackground
        }}>
            {!isReady ? 'Waiting for background ...' : children}
        </BackgroundProviderContext.Provider>
    )
};

export default BackgroundProvider;
