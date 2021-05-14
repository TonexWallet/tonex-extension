import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
    menuItemIcon: {
        height: 24,
        width: 24,
        marginRight: 12
    }
});

const MenuItemIcon = ({onClick, children}) => {
    const classes = useStyles();

    return (
        <div className={classes.menuItemIcon} onClick={onClick}>
            {children}
        </div>
    )
};

export default MenuItemIcon;
