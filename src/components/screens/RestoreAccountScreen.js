import Button from "../Button";
import {createUseStyles} from 'react-jss';
import Typography, {TypographyColor, TypographyVariant} from "../Typography";
import Wrapper from "../Wrapper";
import {useAccount} from "../../providers/AccountProvider";
import Textarea from "../Textarea";
import {useState, useCallback} from 'react';
import InputLabel from "../InputLabel";
import CreatePinPrompt from "../CreatePinPrompt";
import IconButton from "../IconButton";
import {ReactComponent as BackArrowIcon} from "../../img/back-arrow-icon.svg";
import {Link} from "react-router-dom";
import BaseScreen from "../BaseScreen";

const useStyles = createUseStyles({
    restoreForm: {
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: 'center',
    },

    inputLabel: {
        width: '100%'
    },

    seedPhraseInput: {

    },
    screenNavigation: {

    }
});

const RestoreAccountScreen = () => {
    const classes = useStyles();

    const {createAccount} = useAccount();
    const [seedPhrase, setSeedPhrase] = useState('');
    const [isOpenCretePin, setIsOpenCreatePin] = useState(false);

    const isValid = seedPhrase && seedPhrase.split(' ').length === 12;

    const onCreateAccount = useCallback(async (passcode) => {
        setError(null);
        try{
            await createAccount({
                seedPhrase,
                passcode
            });
        }catch (e){
            setError(e);
        }

    }, [createAccount, seedPhrase]);

    const [error, setError] = useState(null);

    return (
        <BaseScreen backAction={(
            <Link to={'/'} className={classes.buttonSend} >
                <IconButton>
                    <BackArrowIcon/>
                </IconButton>
            </Link>
        )}>
            <div className={classes.restoreForm}>
                <Wrapper>
                    <Typography variant={TypographyVariant.SUBHEADER}>
                        Restore exist account
                    </Typography>
                </Wrapper>

                <br/>

                <InputLabel label={'Seed phrase'} className={classes.inputLabel}>
                    <Textarea
                        placeholder={'12 words'}
                        className={classes.seedPhraseInput}
                        autoFocus
                        value={seedPhrase}
                        onChange={setSeedPhrase}/>
                </InputLabel>
                <br/>

                <Button disabled={!isValid} onClick={() => {
                    setIsOpenCreatePin(true)
                }}>Restore</Button>
                <br/>
                {error && (
                    <Typography variant={TypographyVariant.LABEL} color={TypographyColor.DANGER}>
                        {error.message}
                    </Typography>
                )}

            </div>

            <CreatePinPrompt
                isOpen={isOpenCretePin}
                onCancel={() => {
                    setIsOpenCreatePin(false);
                }}
                onDone={async (passcode) => {
                    setIsOpenCreatePin(false);
                    await onCreateAccount( passcode);
                }}/>
        </BaseScreen>
    )
};

export default RestoreAccountScreen;
