import {makeStyles} from "@material-ui/styles";
import clsx from "clsx";

const useStyles = makeStyles({
    card: {
        borderRadius: 16,
        backgroundColor: '#FFFFFF'
    },

    elevation1: {
        boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.04)'
    },

    elevation2: {
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
    }
});

const Card = ({className,  elevation = 1, children}) => {
    const classes = useStyles();

    return (
        <div className={clsx(classes.card, className, {
            [classes.elevation1]: elevation === 1,
            [classes.elevation2]: elevation === 2,
        })}>
            {children}
        </div>
    )
};

export default Card;
