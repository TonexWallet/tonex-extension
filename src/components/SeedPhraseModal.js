import Typography, {TypographyColor, TypographyVariant} from "./Typography";
import {createUseStyles} from 'react-jss';
import {ReactComponent as BackArrowIcon} from '../img/back-arrow-icon.svg';
import {ReactComponent as CopiedIcon} from '../img/copied-icon.svg';
import IconButton from "./IconButton";
import Button from "./Button";
import SeedPhrase from "./SeedPhrase";
import useCopy from "@react-hook/copy";

const useStyles = createUseStyles({
    modalNavigation: {
        display: 'flex',
        width: '100%'
    },

    seedPhraseModal: {
        backgroundColor: "#fff",
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
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
    }
});

const SeedPhraseModal = ({seedPhrase, onApplied, onCancel}) => {
    const classes = useStyles();

    const {copied, copy} = useCopy(
        seedPhrase
    );

    return (
        <div className={classes.seedPhraseModal}>
            <div className={classes.modalNavigation}>
                <IconButton onClick={onCancel}>
                    <BackArrowIcon/>
                </IconButton>
            </div>
            <Typography className={classes.seedPhraseLabel} variant={TypographyVariant.SUBHEADER} color={TypographyColor.PRIMARY}>Seed phrase</Typography>
            <br/>
            <div className={classes.copyLabel}>
                {copied && (
                    <>
                        <CopiedIcon/>&nbsp;Copied
                    </>
                )}
            </div>

            <br/>
            <SeedPhrase seedPhrase={seedPhrase}/>
            <br/>
            <br/>

            <Typography className={classes.seedPhraseDescription} variant={TypographyVariant.BODY}>
                These 12 words are the key to your wallet.
                Please copy them to secure place.
            </Typography>
            <br/>
            <br/>

            {copied ? (
                <Button onClick={onApplied}>
                    I’ve saved it!
                </Button>
            ) : (
                <Button onClick={copy}>
                    Copy phrase
                </Button>
            )}
        </div>
    )
};

export default SeedPhraseModal;
