import {createUseStyles} from 'react-jss';
import WalletAccount from "./WalletAccount";
import AccountActions from "./AccountActions";

const useStyles = createUseStyles({
    walletHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 0'
    }
});

const WalletHeader = ({activeWallet, wallets}) => {
    const classes = useStyles();

    return (
        <div className={classes.walletHeader}>
            <WalletAccount activeWallet={activeWallet} availableWallets={wallets}/>

            <AccountActions/>
        </div>
    )
};

export default WalletHeader;
