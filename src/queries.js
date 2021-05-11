export const walletQuery = (address) => {
    return {
        collection: "accounts",
        filter: {
            id: {
                eq: address
            },
        },
        result: "balance,acc_type",
    }
};

export const walletIncomeTransactionsQuery = address => {
    return {
        collection: "messages",
        filter: {
            msg_type: {
                eq: 0
            },

            dst: {
                eq: address
            }
        },
        order: [{
            path: 'created_at',
            direction: 'DESC'
        }],
        result: "id,msg_type,status,block_id,body,split_depth,tick,tock,code,data,library,src,dst,created_lt,created_at,ihr_disabled,ihr_fee,fwd_fee,import_fee,bounce,bounced,value,proof,boc",
    }
};

export const walletTransactionsQuery = (address) => {
    return {
        collection: "messages",
        filter: {
            msg_type: {
                eq: 0
            },

            dst: {
                eq: address
            },

            OR: {
                msg_type: {
                    eq: 0
                },

                src: {
                    eq: address
                }
            }
        },
        order: [{
            path: 'created_at',
            direction: 'DESC'
        }],
        result: "id,msg_type,status,block_id,body,split_depth,tick,tock,code,data,library,src,dst,created_lt,created_at,ihr_disabled,ihr_fee,fwd_fee,import_fee,bounce,bounced,value,proof,boc",
    };
};
