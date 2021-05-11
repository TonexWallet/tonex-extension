import {makeStyles} from "@material-ui/styles";
import IconButton from "./IconButton";
import {ReactComponent as CloseIcon} from "../img/x.svg";
import clsx from "clsx";

const useStyles = makeStyles({
    fullscreenModal: {
        backgroundColor: "#fff",
        height: '100%',
        width: '100%'
    },

    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        width: 32,
        height: 32,

        '&>svg': {
            width: 32,
            height: 32
        }
    },
});

const FullscreenModal = ({children, className, onClose}) => {
    const classes = useStyles();

    return (
        <div className={clsx(classes.fullscreenModal, className)}>
            {onClose && (
                <IconButton onClick={onClose} className={clsx(classes.closeButton)}>
                    <CloseIcon/>
                </IconButton>
            )}

            {children}
        </div>
    )
};

export default FullscreenModal;
