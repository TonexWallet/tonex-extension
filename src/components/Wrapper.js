import {createUseStyles} from 'react-jss';
import clsx from "clsx";

const useStyles = createUseStyles({
    wrapper: {
        padding: '8px 12px',
        boxSizing: 'border-box'
    }
});

const Wrapper = ({className, children}) => {
    const classes = useStyles();

    return (
        <div className={clsx(classes.wrapper, className)}>
            {children}
        </div>
    )
};

export default Wrapper;
