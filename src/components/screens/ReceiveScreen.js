import {makeStyles} from "@material-ui/styles";
import IconButton from "../IconButton";
import {ReactComponent as BackArrowIcon} from "../../img/back-arrow-icon.svg";
import {Link} from "react-router-dom";
import ScreenNavbar from "../ScreenNavbar";

const useStyles = makeStyles({
    receiveScreen: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
        boxSizing: 'border-box'
    },
});

const ReceiveScreen = () => {
    const classes = useStyles();

    return (
        <div className={classes.receiveScreen}>
            <ScreenNavbar backAction={(
                <Link to={'/'} className={classes.buttonSend} >
                    <IconButton>
                        <BackArrowIcon/>
                    </IconButton>
                </Link>
            )}/>

            <div>
                Receive
            </div>
        </div>
    )
};

export default ReceiveScreen;
