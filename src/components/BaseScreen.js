import {createUseStyles} from 'react-jss';
import ScreenNavbar from "./ScreenNavbar";

const useStyles = createUseStyles({
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
