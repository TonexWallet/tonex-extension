import Card from "./Card";
import Typography, {TypographyVariant} from "./Typography";
import {ReactComponent as CrystalIcon} from '../img/crystal-icon.svg';
import {ReactComponent as ArrowDownIcon} from '../img/arrow-down-icon.svg';
import {makeStyles} from "@material-ui/styles";
import Button from "./Button";
import {useWallets} from "../providers/WalletsProvider";
import {Link} from "react-router-dom";
import formatBalance from "../utils/formatBalance";

const useStyles = makeStyles({
    walletCard: {
        padding: 16,
        boxShadow: '0px 4px 40px rgba(215, 236, 245, 0.8)',
    },

    walletBalanceAmount: {
        fontSize: 36
    },

    walletBalanceDecimal: {
        fontSize: 24
    },

    walletBalanceLabel: {
        display: 'flex',
        alignItems: 'baseline'
    },

    walletActions: {
        display: 'flex',
        marginTop: 18,
    },

    buttonSend: {
        '& svg': {
            transform: 'rotateX(180deg)'
        }
    },

    buttonReceive: {
        marginLeft: 8
    }
});

const WalletCard = () => {
    const classes = useStyles();
    const {activeWallet} = useWallets();

    const balance = formatBalance(activeWallet.balance, 3);

    return (
        <Card className={classes.walletCard} elevation={2}>
            <div className={classes.walletBalance}>
                <Typography variant={TypographyVariant.BODY}>
                    <CrystalIcon/> Ton Crystal
                </Typography>

                <div className={classes.walletBalanceLabel}>
                    <Typography variant={TypographyVariant.HEADER} className={classes.walletBalanceAmount}>
                        {balance.amount}
                    </Typography>
                    <Typography variant={TypographyVariant.SUBHEADER} className={classes.walletBalanceDecimal}>,{balance.decimal}</Typography>
                </div>

                {/*<Typography variant={TypographyVariant.LABEL} color={TypographyColor.SECONDARY}>€ 113,77</Typography>*/}
            </div>
            <div className={classes.walletActions}>
                <Link to={'/transaction/create'} className={classes.buttonSend} >
                    <Button large disabled={!activeWallet.initialized}>
                        <ArrowDownIcon/>&nbsp;Send
                    </Button>
                </Link>

                <Link to={'/receive'} >
                    <Button className={classes.buttonReceive} secondary large>
                        <ArrowDownIcon/>&nbsp;Receive
                    </Button>
                </Link>
            </div>
        </Card>
    )
};

export default WalletCard;
