import Typography, {TypographyColor, TypographyVariant} from "./Typography";
import {makeStyles} from "@material-ui/styles";
import Button from "./Button";

const useStyles = makeStyles({
    pinNavigation: {
        display: 'flex',
        width: '100%'
    },

    confirmationPrompt: {
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

const ConfirmationPrompt = ({title, message, onAgree, onCancel, agreeLabel = 'Continue', cancelLabel = 'Cancel'}) => {
    const classes = useStyles();

    return (
        <div className={classes.confirmationPrompt}>
            <Typography variant={TypographyVariant.SUBHEADER} color={TypographyColor.PRIMARY}>{title}</Typography>
            <Typography variant={TypographyVariant.BODY} color={TypographyColor.PRIMARY}>{message}</Typography>

            <Button onClick={onAgree}>{agreeLabel}</Button>
            <Button onClick={onCancel} link>{cancelLabel}</Button>
        </div>
    )
};

export default ConfirmationPrompt;
