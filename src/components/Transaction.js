import {createUseStyles} from 'react-jss';
import Avatar from "./Avatar";
import {ReactComponent as ArrowIcon} from "../img/arrow-down-icon.svg";
import clsx from "clsx";
import Typography, {TypographyVariant, TypographyColor} from "./Typography";
import shortenWalletAddress from "../utils/shortenWalletAddress";
import formatBalance from "../utils/formatBalance";
import {ReactComponent as CrystalIcon} from "../img/crystal-icon.svg";

const useStyles = createUseStyles({
    transaction: {
        display: 'flex'
    },

    transactionAvatar: {
        display: 'flex',
        position: 'relative'
    },

    transactionIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 8,
        width: 16,
        height: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0085FF',

        '&>svg': {
            width: 12,
            height: 12,
        }
    },

    transactionIn: {
        '& $transactionIcon>svg': {
            transform: 'rotate(-90deg)'
        }
    },

    transactionOut: {
        '& $transactionIcon>svg': {
            transform: 'rotate(90deg)'
        }
    },

    transactionDetails: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        padding: '0 8px',
    },

    transactionAmount: {
        display: 'flex',
        alignItems: 'center',
    }
});

export const TransactionTypeEnum = {
    IN: 'in',
    OUT: 'out'
}

const AmountSignMap = {
    [TransactionTypeEnum.IN]: '+',
    [TransactionTypeEnum.OUT]: '-',
};

const Transaction = ({amount, address, type, datetime}) => {
    const classes = useStyles();

    const formattedAmount = formatBalance(amount, 3);

    return (
        <div className={clsx(classes.transaction, {
            [classes.transactionIn]: type === TransactionTypeEnum.IN,
            [classes.transactionOut]: type === TransactionTypeEnum.OUT,
        })}>
            <div className={classes.transactionAvatar}>
                <Avatar address={address}/>
                <div className={classes.transactionIcon}>
                    <ArrowIcon/>
                </div>
            </div>
            <div className={classes.transactionDetails}>
                <Typography variant={TypographyVariant.LABEL} color={TypographyColor.SECONDARY}>
                    {type === TransactionTypeEnum.IN && 'Received from'}
                    {type === TransactionTypeEnum.OUT && 'Sent to'}
                </Typography>
                <Typography variant={TypographyVariant.BODY2}>
                    {shortenWalletAddress(address)}
                    <Typography variant={TypographyVariant.LABEL} color={TypographyColor.SECONDARY}>
                        &nbsp;at {new Date(datetime * 1000).toLocaleTimeString()}
                    </Typography>
                </Typography>
            </div>
            <div className={classes.transactionAmount}>
                <CrystalIcon/>&nbsp;{AmountSignMap[type]}<Typography variant={TypographyVariant.BODY2}>{formattedAmount.amount}</Typography><Typography variant={TypographyVariant.BODY2} color={TypographyColor.SECONDARY}>,{formattedAmount.decimal}</Typography>
            </div>
        </div>
    )
};

export default Transaction;
