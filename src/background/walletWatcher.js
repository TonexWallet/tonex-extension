import {walletQuery, walletTransactionsQuery} from "../queries";

let walletCache, subscriptionHandlers;

const stopWatch = async (client) => {
    if(subscriptionHandlers && subscriptionHandlers.transactions){
        await client.net.unsubscribe({
            handle: subscriptionHandlers.transactions
        });
    }

    if(subscriptionHandlers && subscriptionHandlers.walletInfo){
        await client.net.unsubscribe({
            handle: subscriptionHandlers.walletInfo
        });
    }

    walletCache = {
        transactions: [],
        walletInfo: {}
    };

    subscriptionHandlers = {
        walletInfo: null,
        transactions: null
    }
}

const watchWallet = async ({client, wallet, onUpdate}) => {
    await stopWatch(client);

    const {handle: transactionsHandle} = (await client.net.subscribe_collection(walletTransactionsQuery(wallet), ({result: transaction}) => {
        if(!transaction || walletCache.transactions.find(item => item.id === transaction.id)){
           return;
        }

        walletCache.transactions = [
            transaction,
            ...walletCache.transactions
        ];

        onUpdate({
            ...walletCache.walletInfo,
            transactions: walletCache.transactions,
        })
    }));

    const {handle: walletInfoHandle} = (await client.net.subscribe_collection(walletQuery(wallet), ({result: walletInfo}) => {
        walletCache.walletInfo = walletInfo;
        onUpdate({
            ...walletCache.walletInfo,
            transactions: walletCache.transactions,
        })
    }));

    subscriptionHandlers.transactions = transactionsHandle;
    subscriptionHandlers.walletInfo = walletInfoHandle;

    walletCache = {
        transactions: (await client.net.query_collection(walletTransactionsQuery(wallet))).result,
        walletInfo: (await client.net.query_collection(walletQuery(wallet))).result[0]
    }

    return {
        transactions: walletCache.transactions,
        ...walletCache.walletInfo
    };
}

export default watchWallet;
