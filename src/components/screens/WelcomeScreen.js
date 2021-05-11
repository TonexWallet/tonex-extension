import {makeStyles} from "@material-ui/styles";
import Wrapper from "../Wrapper";
import Typography, {TypographyColor, TypographyVariant} from "../Typography";
import Button from "../Button";
import {Link} from "react-router-dom";
import {ReactComponent as TonexIcon} from '../../img/tonex.svg';

const useStyles = makeStyles({
    welcomeScreen: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: 'center',
    },

    actionButtons: {
        display: 'flex',
        alignItem: 'center',
        flexDirection: 'column',
        '&>*+*': {
            marginTop: 64
        }
    },

    welcomeScreenWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 240,
        '&>*': {
            textAlign: 'center'
        },
        '&>*+*': {
            marginTop: 16
        }
    }
});

const WelcomeScreen = () => {
    const classes = useStyles();

    return (
        <div className={classes.welcomeScreen}>
            <TonexIcon/>
            <Wrapper className={classes.welcomeScreenWrapper}>
                <Typography variant={TypographyVariant.SUBHEADER} color={TypographyColor.PRIMARY}>
                    Welcome to Tonex!
                </Typography>
                <Typography variant={TypographyVariant.BODY} color={TypographyColor.PRIMARY}>
                    You can create your account or restore exists with seed phrase
                </Typography>
                <div className={classes.actionButtons}>
                    <Button as={Link} to={'/account/create'}>Create new wallet</Button>

                    <Button as={Link} link to={'/account/restore'}>Restore</Button>
                </div>
            </Wrapper>
        </div>
    )
};

export default WelcomeScreen;
