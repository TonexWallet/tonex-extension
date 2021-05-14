import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
    menuItem: {
        minHeight: 32,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '8px 16px',
        boxSizing: 'border-box',
        color: '#2E2E2E',
        textDecoration: 'none',

        '&:hover': {
            backgroundColor: '#E8F4FF',
        }
    }
});

const MenuItem = ({onClick, children}) => {
    const classes = useStyles();

    return (
        <div className={classes.menuItem} onClick={onClick}>
            {children}
        </div>
    )
};

export default MenuItem;
