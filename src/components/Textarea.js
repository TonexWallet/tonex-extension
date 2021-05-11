import {makeStyles} from "@material-ui/styles";
import Typography, {TypographyColor, TypographyVariant} from "./Typography";
import clsx from "clsx";

const useStyles = makeStyles({
    textareaContainer: {
        position: 'relative',
        width: '100%',
    },
    textarea: {
        width: '100%',
        resize: 'none',
        boxSizing: 'border-box',
        border: '1px solid #F3F3F3',
        borderRadius: 6,
        fontFamily: "'IBM Plex Sans', sans-serif",
        color: '#2E2E2E',
        fontWeight: 'bold',
        fontSize: '12px',
        lineHeight: '16px',
        outline: 'none',
        padding: 8,
        margin: 0,
    },
    maxLengthLabel: {
        position: 'absolute',
        bottom: 10,
        right: 10
    }
});

const Textarea = ({placeholder, className, value = '', onChange, rows = 3, autoFocus, maxLength, classes: classesOverride = {}}) => {
    const classes = useStyles();

    return (
        <div className={clsx(classes.textareaContainer, classesOverride.textareaContainer)}>
            <textarea
                placeholder={placeholder}
                autoFocus={autoFocus}
                onChange={(e) => {
                    onChange(e.target.value)
                }}
                className={clsx(classes.textarea, className)}
                value={value}
                rows={rows}
                maxLength={maxLength}/>

            {maxLength && (
                <div className={classes.maxLengthLabel}>
                    <Typography variant={TypographyVariant.LABEL} color={TypographyColor.SECONDARY}>
                        {value.length} / {maxLength}
                    </Typography>
                </div>
            )}
        </div>
    )
};

export default Textarea;
