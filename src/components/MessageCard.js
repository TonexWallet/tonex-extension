import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    messageCard: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#EEF6FF',
        borderRadius: 6,
        padding: '8px 16px'
    },
});

const MessageCard = ({children}) => {
    const classes = useStyles();

    return (
        <div className={classes.messageCard}>
            {children}
        </div>
    )
};

export default MessageCard;
