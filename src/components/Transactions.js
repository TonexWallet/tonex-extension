import {createUseStyles} from 'react-jss';
import Transaction, {TransactionTypeEnum} from "./Transaction";
import {useWallets} from "../providers/WalletsProvider";
import {ReactComponent as EmptyActivityIcon} from '../img/empty-activity-icon.svg';
import Typography, {TypographyVariant, TypographyColor} from "./Typography";

const useStyles = createUseStyles({
    transactions: {
        '&>*': {
            marginTop: 8
        }
    },

    emptyState: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 0',
        flexDirection: 'column'
    }
});

const processTransaction = (address, {id, value, ...transaction}) => {
    const data = {
        id,
        value
    };

    if(transaction.dst === address){
        data.type = TransactionTypeEnum.IN;
        data.address = transaction.src;
    }

    if(transaction.src === address){
        data.type = TransactionTypeEnum.OUT;
        data.address = transaction.dst;
    }

    return data;
};

const Transactions = () => {
    const classes = useStyles();
    const {activeWallet} = useWallets();
    const transactions = activeWallet.transactions && activeWallet.transactions.map(transaction => {
        return {
            ...transaction,
            ...processTransaction(activeWallet.address, transaction)
        }
    });

    if(!transactions || !transactions.length){
        return (
            <div className={classes.emptyState}>
                <EmptyActivityIcon/>
                <br/>
                <Typography variant={TypographyVariant.BODY2} color={TypographyColor.SECONDARY}>
                    No activities yet
                </Typography>
            </div>
        )
    }

    return (
        <div className={classes.transactions}>
            {transactions && transactions.map(transaction => {
                return (
                    <Transaction
                        key={transaction.id}
                        amount={transaction.value}
                        type={transaction.type}
                        datetime={transaction.created_at}
                        address={transaction.address}/>
                )
            })}
        </div>
    )
};

export default Transactions;
