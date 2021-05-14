import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
    popup: {
        width: 320,
        height: 560,
        backgroundColor: '#fff'
    }
});

const Popup = ({children}) => {
    const classes = useStyles();

    return (
        <div className={classes.popup}>
            {children}
        </div>
    )
};

export default Popup;
