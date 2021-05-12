import Typography, {TypographyColor, TypographyVariant} from "./Typography";
import {makeStyles} from "@material-ui/styles";
import clsx from "clsx";

const useStyles = makeStyles({
    label: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    labelContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4
    }
});

const InputLabel = ({label, errorMessage, infoMessage, className, children}) => {
    const classes = useStyles();

    return (
        <label className={clsx(classes.label, className)}>
            <div className={classes.labelContent}>
                <Typography variant={TypographyVariant.BODY}>
                    {label}
                </Typography>

                {errorMessage && (
                    <Typography variant={TypographyVariant.BODY2} color={TypographyColor.DANGER}>
                        {errorMessage}
                    </Typography>
                )}
            </div>

            {children}

            {infoMessage && (
                <Typography variant={TypographyVariant.LABEL} color={TypographyColor.SECONDARY}>
                    {infoMessage}
                </Typography>
            )}
        </label>
    )
};

export default InputLabel;
