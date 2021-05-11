import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
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
