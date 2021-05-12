import isEmpty from "lodash/isEmpty";
import base64ToHex from "../utils/base64toHex";

import extensionApi from '../lib/ExtensionApi';

export const encryptValue = async (tonLib, {
    value,
    passcode
}) => {
    const key = (await tonLib.crypto.sha256({data: btoa(passcode)})).hash;

    const randomBytesBase64 = (await tonLib.crypto.generate_random_bytes({length: 12})).bytes;
    const nonce = base64ToHex(randomBytesBase64);

    const dataBase64 = btoa(JSON.stringify(value));
    const {data} = await tonLib.crypto.chacha20({data: dataBase64, key, nonce});

    return {
        data,
        nonce
    };
}

export const decryptValue = async (tonLib, {
    passcode,
    value
}) => {
    if(isEmpty(value)){
        return;
    }

    const key = (await tonLib.crypto.sha256({data: btoa(passcode)})).hash;
    const decryptedData = (await tonLib.crypto.chacha20({data: value.data, key, nonce: value.nonce})).data;
    return JSON.parse(atob(decryptedData));
}

export const getStoreValue = async (key) => {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line no-undef
        extensionApi.storage.local.get(key, (storage) => {
            const storageValue = storage[key];

            resolve(storageValue);
        });
    })
}

export const setStoreValue = async (key, value) => {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line no-undef
        extensionApi.storage.local.set({[key]: value}, (...args) => {
            resolve(...args)
        });
    })
}

export const removeStoreValue = async (key) => {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line no-undef
        extensionApi.storage.local.remove(key, (...args) => {
            resolve(...args)
        });
    })
}

