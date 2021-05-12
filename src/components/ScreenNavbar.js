import Button from "./Button";
import {makeStyles} from "@material-ui/styles";
import clsx from "clsx";

const useStyles = makeStyles({
    screenNavbar: {
        display: 'flex',
        width: '100%',
    },
});

const ScreenNavbar = ({className, backAction}) => {
    const classes = useStyles();

    return (
        <div className={clsx(classes.screenNavbar, className)}>
            {backAction}
        </div>
    )
};

export default ScreenNavbar;
