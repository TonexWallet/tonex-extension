import {createUseStyles} from 'react-jss';
import IconButton from "../IconButton";
import {ReactComponent as BackArrowIcon} from "../../img/back-arrow-icon.svg";
import {Link} from "react-router-dom";
import BaseScreen from "../BaseScreen";
import Avatar from "../Avatar";
import Typography, {TypographyColor, TypographyVariant} from "../Typography";
import shortenWalletAddress from "../../utils/shortenWalletAddress";
import formatBalance from "../../utils/formatBalance";
import {useWallets} from "../../providers/WalletsProvider";
import {ReactComponent as CopyIcon} from '../../img/copy-icon.svg';
import useCopy from "@react-hook/copy";

const useStyles = createUseStyles({
    receiveContent: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },

    walletInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 120
    },

    receiveActions: {
        marginTop: 16
    }
});

const ReceiveScreen = () => {
    const classes = useStyles();

    const {activeWallet} = useWallets();

    const {address, balance} = activeWallet;
    const {copy} = useCopy(address);

    return (
        <BaseScreen backAction={(
            <Link to={'/'} className={classes.buttonSend} >
                <IconButton>
                    <BackArrowIcon/>
                </IconButton>
            </Link>
        )}>
            <div className={classes.receiveContent}>
                <div className={classes.walletInfo}>
                    <Avatar address={address} size={64}/>
                    <Typography variant={TypographyVariant.SUBHEADER}>
                        {shortenWalletAddress(address)}
                    </Typography>
                    <Typography variant={TypographyVariant.LABEL} color={TypographyColor.SECONDARY}>
                        Balance: {formatBalance(balance, 3, false)}
                    </Typography>
                </div>
                <div className={classes.receiveActions}>
                    <IconButton onClick={() => {
                        copy();
                    }}>
                        <CopyIcon/>
                    </IconButton>
                </div>

            </div>
        </BaseScreen>
    )
};

export default ReceiveScreen;
