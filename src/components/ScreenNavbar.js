import {createUseStyles} from 'react-jss';
import clsx from "clsx";

const useStyles = createUseStyles({
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
