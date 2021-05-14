import {createUseStyles} from 'react-jss';
import clsx from "clsx";
import React from "react";

const useStyles = createUseStyles({
    button: {
        minWidth: 100,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        appearance: 'none',
        outline: 'none',
        background: '#0085FF',
        color: '#fff',
        cursor: 'pointer',
        borderRadius: 15,
        fontSize: '12px',
        lineHeight: '16px',
        fontWeight: 'bold',
        textDecoration: 'none',
        padding: '0 8px',

        '&:disabled': {
            cursor: 'initial',
            opacity: 0.5,
            '&:hover': {
                opacity: 0.5,
            },
        },

        '&:hover': {
            opacity: 0.9,
        },

        '&:active': {
            opacity: 0.6
        }
    },

    linkButton: {
        background: 'transparent',
        color: '#0085FF',
        border: 'none',
        minWidth: 'initial',
        padding: 0,
    },

    large: {
        height: 40,
        borderRadius: 20
    },

    secondaryButton: {
        background: '#fff',
        color: '#0085FF',
        border: '1px solid #0085FF'
    }
});

const Button = ({as = 'button', className, link = false, large = false, secondary = false, children, disabled, onClick, ...props}) => {
    const classes = useStyles();

    return React.createElement(as, {
        ...props,
        disabled,
        onClick,
        className: clsx(
            classes.button,
            {
                [classes.secondaryButton]: secondary,
                [classes.linkButton]: link,
                [classes.large]: large
            },
            className,
        )
    }, children);
};

export default Button;
