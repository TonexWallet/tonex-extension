import Button from "../Button";
import {makeStyles} from "@material-ui/styles";
import Typography, {TypographyVariant} from "../Typography";
import Wrapper from "../Wrapper";
import {useAccount} from "../../providers/AccountProvider";
import Textarea from "../Textarea";
import {useState} from 'react';
import InputLabel from "../InputLabel";
import CreatePinPrompt from "../CreatePinPrompt";

const useStyles = makeStyles({
    restoreAccountScreen: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: 'center',
        padding: 16,
        boxSizing: 'border-box'
    },

    restoreForm: {
        width: '100%',
        position: 'relative'
    },

    seedPhraseInput: {

    }
});

const RestoreAccountScreen = () => {
    const classes = useStyles();

    const {createAccount} = useAccount();
    const [seedPhrase, setSeedPhrase] = useState('');
    const [isOpenCretePin, setIsOpenCreatePin] = useState(false);

    return (
        <div className={classes.restoreAccountScreen}>
            <Wrapper>
                <Typography variant={TypographyVariant.SUBHEADER}>
                    Restore exist account
                </Typography>
            </Wrapper>

            <br/>

            <div className={classes.restoreForm}>
                <InputLabel label={'Seed phrase'}>
                    <Textarea
                        placeholder={'12 words'}
                        className={classes.seedPhraseInput}
                        autoFocus
                        value={seedPhrase}
                        onChange={setSeedPhrase}/>
                </InputLabel>
            </div>
            <br/>

            <Button onClick={() => {
                setIsOpenCreatePin(true)
            }}>Restore</Button>

            <CreatePinPrompt
                isOpen={isOpenCretePin}
                onCancel={() => {
                    setIsOpenCreatePin(false);
                }}
                onDone={async (passcode) => {
                    setIsOpenCreatePin(false);
                    await createAccount({
                        seedPhrase,
                        passcode
                    });
                }}/>
        </div>
    )
};

export default RestoreAccountScreen;
