import {makeStyles} from "@material-ui/styles";
import clsx from "clsx";
import Typography, {TypographyColor, TypographyVariant} from "./Typography";

const useStyles = makeStyles({
    tabs: {
        width: '100%',
        display: 'flex',
        height: 36,
        backgroundColor: "#F3F3F3",
        borderRadius: 6,
        padding: 4,
        boxSizing: 'border-box'
    },

    tab: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        cursor: 'pointer',
    },

    tabActive: {
        backgroundColor: '#fff',
        cursor: 'initial',
    }
});

const Tabs = ({tabs, activeTab, onChange}) => {
    const classes = useStyles();

    return (
        <div className={classes.tabs}>
            {tabs.map((item, index) => {
                return (
                    <div key={index} onClick={() => {
                        onChange(index)
                    }} className={clsx(classes.tab, {
                        [classes.tabActive]: activeTab === index
                    })}>
                        <Typography variant={TypographyVariant.BODY2} color={TypographyColor.PRIMARY}>{item.label}</Typography>
                    </div>
                )
            })}
        </div>
    )
};

export default Tabs;
