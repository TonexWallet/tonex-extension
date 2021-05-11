import {makeStyles} from "@material-ui/styles";
import Typography, {TypographyColor, TypographyVariant} from "./Typography";
import Dropdown from "./Dropdown";
import {useState} from "react";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import {AvailableNetworks, useTon} from "../providers/TonProvider";

const useStyles = makeStyles({
    statusBar: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 26,
        backgroundColor: '#EEF6FF',
    },

    networkLabel: {

    },

    networkDropdown: {
        cursor: 'pointer',
    }
});

const NetworkStatusBar = () => {
    const classes = useStyles();

    const [networkDropdownOpened, setNetworkDropdownOpened] = useState(false);
    const {network: activeNetwork, changeNetwork} = useTon();

    return (
        <div className={classes.statusBar} >
            <Dropdown isOpened={networkDropdownOpened} onClose={setNetworkDropdownOpened} content={(
                <Menu>
                    {AvailableNetworks.map(network => (
                        <MenuItem key={network} onClick={() => {
                            setNetworkDropdownOpened(false);
                            changeNetwork(network);
                        }}>{network}</MenuItem>
                    ))}
                </Menu>
            )}>
                <Typography onClick={() => setNetworkDropdownOpened(true)} className={classes.networkDropdown} variant={TypographyVariant.BODY2} color={TypographyColor.BRAND}>
                    {activeNetwork}
                </Typography>
            </Dropdown>
        </div>
    )
};

export default NetworkStatusBar;
