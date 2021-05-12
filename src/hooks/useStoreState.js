import {useCallback, useEffect, useMemo, useReducer} from "react";

import extensionApi from '../lib/ExtensionApi';

const valueReducer = (state, action) => {
    switch (action.type) {
        case 'loaded':
            return {
                ...state,
                loaded: true,
                value: action.payload.value
            };
        case 'changed':
            return {
                ...state,
                value: action.payload.value
            };
        default:
            throw new Error();
    }
}


const useStoreState = (key, initialValue) => {
    const [state, dispatch] = useReducer(valueReducer, {
        loaded: false
    });

    if(key === 'routerEntries'){
        console.log(state);
    }

    const updateValue = useCallback(value => {
        dispatch({
            type: 'changed',
            payload: {
                value
            }
        });

        extensionApi.storage.local.set({[key]: value}, () => {

        });
    }, [key]);

    useEffect(() => {
        if(!state.loaded){
            extensionApi.storage.local.get(key, (storage) => {
                const storageValue = storage[key];

                if(storageValue){
                    dispatch({
                        type: 'loaded',
                        payload: {
                            value: storageValue
                        }
                    });
                }else{
                    if(typeof initialValue !== 'undefined'){
                        dispatch({
                            type: 'loaded',
                            payload: {
                                value: initialValue
                            }
                        });
                    }
                }
            });
        }
    }, [initialValue, key, state.loaded]);

    return useMemo(() => {
        return [
            state.value,
            updateValue,
            state.loaded
        ]
    }, [state, updateValue])
};

export default useStoreState;
