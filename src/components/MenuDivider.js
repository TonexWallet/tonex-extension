import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
    menuDivider: {
        width: '100%',
        height: 1,
        backgroundColor: '#cce7ff',
    }
});

const MenuDivider = ({onClick, children}) => {
    const classes = useStyles();

    return (
        <div className={classes.menuDivider} onClick={onClick}>
            {children}
        </div>
    )
};

export default MenuDivider;
