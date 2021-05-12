import {ReactComponent as CrystalIcon} from "../img/crystal-icon.svg";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    loader: {
        '&>svg:first-child': {

        }
    },

    spinner: {
        width: 94,
        height: 94,
        backgroundImage: 'url("/img/loader.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        animation: '$spin 2s linear infinite'
    },

    '@keyframes spin': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(-360deg)' }
    }
});

const Loader = () => {
    const classes = useStyles();

    return (
        <div className={classes.loader}>
            <div className={classes.spinner}/>
            <CrystalIcon/>
        </div>
    )
};

export default Loader;
