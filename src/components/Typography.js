import {createUseStyles} from 'react-jss';
import clsx from "clsx";

const useStyles = createUseStyles({
    typography: {
        fontFamily: "'IBM Plex Sans', sans-serif",
        color: '#2E2E2E',
        fontWeight: 500,
        display: 'inline-block',
    },

    header: {
        fontSize: '24px',
        lineHeight: '47px'
    },

    subheader: {
        fontSize: '18px',
        lineHeight: '32px',
        fontWeight: 500,
    },

    body: {
        fontSize: '14px',
        lineHeight: '18px'
    },

    body2: {
        fontSize: '12px',
        lineHeight: '16px'
    },

    label: {
        color: '#A1A2A3',
        fontWeight: 'normal',
        fontSize: '12px',
        lineHeight: '16px'
    },

    brand: {
        color: '#0085FF'
    },

    primary: {
        color: '#2E2E2E'
    },

    secondary: {
        color: '#A1A2A3'
    },

    danger: {
        color: '#FF005C'
    }
});

export const TypographyVariant = {
    HEADER: 'header',
    SUBHEADER: 'subheader',
    BODY: 'body',
    BODY2: 'body2',
    LABEL: 'label',
};

export const TypographyColor = {
    BRAND: 'brand',
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    DANGER: 'danger',
}

const Typography = ({onClick, variant = TypographyVariant.BODY, color = TypographyColor.PRIMARY, className, children}) => {
    const classes = useStyles();

    return (
        <div onClick={onClick} className={clsx(classes.typography, classes[variant], classes[color], className)}>
            {children}
        </div>
    )
};

export default Typography;
