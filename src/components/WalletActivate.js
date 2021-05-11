import IconButton from "./IconButton";
import {ReactComponent as InfoIcon} from "../img/info-icon.svg";
import Typography, {TypographyColor, TypographyVariant} from "./Typography";
import Button from "./Button";
import MessageCard from "./MessageCard";
import useModal from "../hooks/useModal";
import {makeStyles} from "@material-ui/styles";
import FullscreenModal from "./FullscreenModal";
import {useCallback} from 'react';
import {useWallets} from "../providers/WalletsProvider";
import shortenWalletAddress from "../utils/shortenWalletAddress";
import Avatar from "./Avatar";
import {usePasscodePrompt} from "../providers/PasscodePromptProvider";
import formatBalance from "../utils/formatBalance";

const useStyles = makeStyles({
    activateModal: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },

    activateContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: 210
    },

    activateLink: {
        marginLeft: 'auto',
        fontSize: '14px',
    }
});

const WalletActivate = () => {
    const {show, hide, RenderModal: ActivateModal} = useModal();
    const {showPrompt: showPasscode, hide: hidePasscode} = usePasscodePrompt();
    const {activeWallet, activateWallet} = useWallets();

    const classes = useStyles();

    const deploy = useCallback(async (passcode) => {
        activateWallet({
            hdPath: activeWallet.hdPath,
            passcode
        });
    }, [activateWallet, activeWallet.hdPath]);

    const {amount: feeAmount, decimal: feeDecimal} = formatBalance(activeWallet.deployFee);

    return (
        <div>
            {!activeWallet.initialized && (
                <MessageCard>
                    <IconButton primary>
                        <InfoIcon/>
                    </IconButton>
                    &nbsp;
                    <Typography variant={TypographyVariant.BODY} color={TypographyColor.PRIMARY}>Wallet is not activated</Typography>
                    <Button className={classes.activateLink} link onClick={show}>Activate</Button>
                </MessageCard>
            )}

            <ActivateModal>
                <FullscreenModal onClose={hide} className={classes.activateModal}>
                    <div className={classes.activateContent}>
                        <div>
                            <Avatar address={activeWallet.address} size={64}/>
                        </div>
                        <Typography variant={TypographyVariant.SUBHEADER}>
                            {shortenWalletAddress(activeWallet.address)}
                        </Typography>

                        <Button onClick={() => {
                            showPasscode({
                                onChange: deploy,
                                onCancel: () => {
                                    hidePasscode();
                                }
                            })
                        }}>
                            Activate
                        </Button>

                        <Typography variant={TypographyVariant.LABEL} color={TypographyColor.SECONDARY}>
                            Estimated fee: <b>{feeAmount},{feeDecimal}</b>
                        </Typography>
                    </div>
                </FullscreenModal>
            </ActivateModal>
        </div>
    )
};

export default WalletActivate;
