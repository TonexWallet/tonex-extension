import Typography, {TypographyColor, TypographyVariant} from "./Typography";
import PinInput from "./PinInput";
import {createUseStyles} from 'react-jss';
import {ReactComponent as BackArrowIcon} from '../img/back-arrow-icon.svg';
import IconButton from "./IconButton";


const useStyles = createUseStyles({
    pinLabel: {
        margin: '32px 16px'
    },

    pinNavigation: {
        display: 'flex',
        width: '100%'
    },

    pinPrompt: {
        backgroundColor: "#fff",
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        boxSizing: 'border-box'
    }
});

const PinPrompt = ({label, onChange, cancelLabel = 'Back', onCancel}) => {
    const classes = useStyles();

    return (
        <div className={classes.pinPrompt}>
            <div className={classes.pinNavigation}>
                {onCancel && (
                    <IconButton onClick={onCancel}>
                        <BackArrowIcon/>
                    </IconButton>
                )}
            </div>
            <Typography className={classes.pinLabel} variant={TypographyVariant.SUBHEADER} color={TypographyColor.PRIMARY}>{label}</Typography>
            <PinInput onChange={onChange}/>
        </div>
    )
};

export default PinPrompt;
