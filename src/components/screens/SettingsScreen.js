import BaseScreen from "../BaseScreen";
import IconButton from "../IconButton";
import {ReactComponent as BackArrowIcon} from "../../img/back-arrow-icon.svg";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";
import {usePasscodePrompt} from "../../providers/PasscodePromptProvider";
import {AvailableNetworks, useTon} from "../../providers/TonProvider";
import InputLabel from "../InputLabel";
import Typography, {TypographyColor, TypographyVariant} from "../Typography";
import Button from "../Button";
import Textarea from "../Textarea";
import {useState} from 'react';
import {useAccount} from "../../providers/AccountProvider";
import {useWallets} from "../../providers/WalletsProvider";

const useStyles = makeStyles({
    settingsScreen: {
        display: 'flex',
        flexDirection: 'column',
        padding: '32px 0',
    },

    seedPhrase: {
        marginTop: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    }
});

const SettingsScreen = () => {
    const classes = useStyles();
    const [secrets, setSecrets] = useState({});
    const {seedPhrase, secretKey} = secrets;
    const {getAccountSecret} = useAccount();
    const {activeWallet} = useWallets();

    const {showPrompt: showPasscode, hide: hidePasscode} = usePasscodePrompt();
    const [error, setError] = useState(null);
    const {network: activeNetwork, changeNetwork} = useTon();

    return (
        <BaseScreen backAction={(
            <Link to={'/'} className={classes.buttonSend} >
                <IconButton>
                    <BackArrowIcon/>
                </IconButton>
            </Link>
        )}>
            <div className={classes.settingsScreen}>
                <Typography variant={TypographyVariant.SUBHEADER}>Settings</Typography>
                <InputLabel>
                    Choose Network
                    <select value={activeNetwork} onChange={(e) => {
                        console.log('changing network', e.target.value);
                        changeNetwork(e.target.value);
                    }}>
                        {AvailableNetworks.map(network => {
                            return (
                                <option key={network} value={network}>{network}</option>
                            )
                        })}
                    </select>
                </InputLabel>


                <div className={classes.seedPhrase}>
                    <Typography>Your Keys and Seed Phrase</Typography>

                    <br/>

                    <InputLabel label={'Public Key'}>
                        <Textarea readOnly={true} value={activeWallet.publicKey}/>
                    </InputLabel>

                    <InputLabel label={'Secret Key'}>
                        <Textarea readOnly={true} value={secretKey} placeholder={secretKey ? null : 'Locked'}/>
                    </InputLabel>

                    <InputLabel label={'Seed Phrase'}>
                        <Textarea readOnly={true} value={seedPhrase} placeholder={seedPhrase ? null : 'Locked'}/>
                    </InputLabel>

                    {error && (
                        <Typography variant={TypographyVariant.LABEL} color={TypographyColor.DANGER}>
                            {error.message}
                        </Typography>
                    )}


                    <br/>

                    <Button onClick={() => {
                        showPasscode({
                            onChange: async (passcode) => {
                                setError(null);

                                try{
                                    const secrets = await getAccountSecret({
                                        passcode,
                                        hdPath: activeWallet.hdPath
                                    });

                                    setSecrets(secrets);
                                    hidePasscode();
                                }catch (e){
                                    setError(e);
                                }
                            }
                        });
                    }}>
                        Unlock Seed Phrase
                    </Button>
                </div>
            </div>
        </BaseScreen>
    )
};

export default SettingsScreen;
