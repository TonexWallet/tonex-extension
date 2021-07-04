import WalletHeader from "../WalletHeader";
import WalletCard from "../WalletCard";
import {useWallets} from "../../providers/WalletsProvider";
import WalletActivate from "../WalletActivate";
import Typography, {TypographyColor, TypographyVariant} from "../Typography";
import Transactions from "../Transactions";
import BaseScreen from "../BaseScreen";

const WalletScreen = () => {
    const {activeWallet, wallets} = useWallets();

    if(!activeWallet){
        return (
            <div>
                Wait for wallet
            </div>
        );
    }

    return (
        <BaseScreen>
            <WalletHeader activeWallet={activeWallet} wallets={wallets}/>
            <WalletCard/>

            {!activeWallet.initialized && (
                <>
                    <br/>
                    <WalletActivate/>
                </>
            )}
            <br/>
            <Typography variant={TypographyVariant.BODY} color={TypographyColor.PRIMARY}>
                Activity
            </Typography>

            <Transactions/>
        </BaseScreen>
    )
};

export default WalletScreen;
