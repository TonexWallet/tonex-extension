import Wrapper from "../Wrapper";
import WalletHeader from "../WalletHeader";
import WalletCard from "../WalletCard";
import {useWallets} from "../../providers/WalletsProvider";
import WalletActivate from "../WalletActivate";
import Typography, {TypographyColor, TypographyVariant} from "../Typography";
import Transactions from "../Transactions";

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
        <>
            <Wrapper>
                <WalletHeader activeWallet={activeWallet} wallets={wallets}/>
            </Wrapper>
            <Wrapper>
                <WalletCard/>
            </Wrapper>
            {!activeWallet.initialized && (
                <Wrapper>
                    <WalletActivate/>
                </Wrapper>
            )}
            <Wrapper>
                <Typography variant={TypographyVariant.BODY} color={TypographyColor.PRIMARY}>
                    Activity
                </Typography>

                <Transactions/>
            </Wrapper>
        </>
    )
};

export default WalletScreen;
