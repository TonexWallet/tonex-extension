import {makeStyles} from "@material-ui/styles";
import ScreenNavbar from "./ScreenNavbar";

const useStyles = makeStyles({
    baseScreen: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
        boxSizing: 'border-box'
    },
});

const BaseScreen = ({backAction, children}) => {
    const classes = useStyles();

    return (
        <div className={classes.baseScreen}>
            <ScreenNavbar backAction={backAction}/>
            {children}
        </div>
    )
};

export default BaseScreen;
