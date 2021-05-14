import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
    menu: {

    }
})

const Menu = ({children}) => {
    const classes = useStyles();

    return (
        <div className={classes.menu}>
            {children}
        </div>
    )
};

export default Menu;
