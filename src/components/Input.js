import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    input: {
        width: '100%',
        position: 'relative',
        boxSizing: 'border-box',
        display: 'flex',
        height: 36,
        border: '1px solid #F3F3F3',
        borderRadius: 6,
        overflow: 'hidden',
        padding: '0 4px'
    },
    inputStartAdornment: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 2px'
    },
    inputEndAdornment: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 2px'
    },

    inputContent: {
        width: '100%',
        position: 'relative',
        padding: '0 4px'
    },

    inputField: {
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        fontFamily: "'IBM Plex Sans', sans-serif",
        color: '#2E2E2E',
        fontWeight: 'bold',
        fontSize: '12px',
        lineHeight: '16px',
        border: 0,
        outline: 'none',
        padding: 0,
        margin: 0,
        paddingBottom: 1,
    },
});

const Input = ({type, value, onChange, onBlur, onFocus, startAdornment, endAdornment}) => {
    const classes = useStyles();

    return (
        <div className={classes.input}>
            {startAdornment && (
                <div className={classes.inputStartAdornment}>
                    {startAdornment}
                </div>
            )}

            <div className={classes.inputContent}>
                <input
                    onChange={onChange}
                    type={type}
                    className={classes.inputField}
                    value={value}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            </div>

            {endAdornment && (
                <div className={classes.inputEndAdornment}>
                    {endAdornment}
                </div>
            )}
        </div>
    )
};

export default Input;
