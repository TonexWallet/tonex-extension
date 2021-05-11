import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    menuItem: {
        minHeight: 32,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '8px 16px',
        boxSizing: 'border-box',

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
