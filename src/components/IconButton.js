import {createUseStyles} from 'react-jss';
import clsx from "clsx";

const useStyles = createUseStyles({
    iconButton: {
        width: 28,
        height: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        appearance: 'none',
        background: 'none',
        cursor: 'pointer',
        borderRadius: 14,
        outline: 'none',
        padding: 0,
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
        },
        '&:active': {
            opacity: 0.6
        }
    },

    iconButtonLarge: {
        width: 64,
        height: 64,
        padding: 16,
        borderRadius: 32
    },

    primaryButton: {
        color: '#0085FF',
    }
});

const IconButton = ({onClick, large = false, primary, className, children}) => {
    const classes = useStyles();

    return (
        <button onClick={onClick} className={clsx(classes.iconButton, {
            [classes.iconButtonLarge]: large,
            [classes.primaryButton]: primary
        }, className)}>
            {children}
        </button>
    )
};

export default IconButton;
