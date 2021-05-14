import Typography, {TypographyColor, TypographyVariant} from "./Typography";
import {createUseStyles} from 'react-jss';
import {ReactComponent as BackArrowIcon} from '../img/back-arrow-icon.svg';
import IconButton from "./IconButton";
import Button from "./Button";
import SeedPhraseInput from "./SeedPhraseInput";
import {useCallback, useState, useMemo} from 'react';
import shuffle from 'lodash/shuffle';

const useStyles = createUseStyles({
    modalHeader: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center'
    },

    seedPhraseConfirmationModal: {
        backgroundColor: "#fff",
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 18,
        boxSizing: 'border-box'
    },

    seedPhraseLabel: {

    },

    seedPhraseDescription: {
        textAlign: 'center'
    },

    copyLabel: {
        display: 'flex',
        alignItems: 'center',
        height: '1em',
        color: '#0085FF',
        fontSize: '12px',
        fontWeight: 500
    },

    backButton: {
        position: 'absolute',
        left: 18
    }
});

const SeedPhraseConfirmationModal = ({onConfirmed, seedPhrase, onCancel}) => {
    const classes = useStyles();

    const [isValid, setIsValid] = useState(false);

    const onSeedPhraseEntered = useCallback((value) => {
        setIsValid(seedPhrase === value);
    }, [seedPhrase]);

    const shuffledSeedPhrase = useMemo(() => shuffle(seedPhrase.split(' ')), [seedPhrase])
    // const shuffledSeedPhrase = useMemo(() => seedPhrase.split(' '), [seedPhrase])

    return (
        <div className={classes.seedPhraseConfirmationModal}>
            <div className={classes.modalHeader}>
                <IconButton onClick={onCancel} className={classes.backButton}>
                    <BackArrowIcon/>
                </IconButton>
                <Typography className={classes.seedPhraseLabel} variant={TypographyVariant.SUBHEADER} color={TypographyColor.PRIMARY}>Place seed phrase</Typography>
            </div>
            <br/>

            <SeedPhraseInput
                words={shuffledSeedPhrase}
                onChange={onSeedPhraseEntered}/>
            <br/>

            <Button onClick={onConfirmed} disabled={!isValid}>
                Continue
            </Button>
        </div>
    )
};

export default SeedPhraseConfirmationModal;
