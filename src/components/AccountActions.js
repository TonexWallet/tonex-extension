import {makeStyles} from "@material-ui/styles";
import {ReactComponent as MoreIcon} from '../img/more-vertical-icon.svg';
import {ReactComponent as LockIcon} from '../img/lock-icon.svg';
import {ReactComponent as RemoveIcon} from '../img/remove-icon.svg';
import {ReactComponent as SettingsIcon} from '../img/settings-icon.svg';
import IconButton from "./IconButton";
import Dropdown from "./Dropdown";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import {useState} from 'react';
import {useConfirmationPrompt} from "../providers/ConfirmationPromptProvider";
import {useAccount} from "../providers/AccountProvider";
import MenuItemIcon from "./MenuItemIcon";
import MenuDivider from "./MenuDivider";
import Typography, {TypographyColor} from "./Typography";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    accountActions: {
        display: 'flex',
    },

    dropdownContent: {
        right: 0,
        top: 32,
        left: 'initial'
    }
});

const AccountActions = () => {
    const classes = useStyles();

    const [dropdownOpened, setDropdownOpened] = useState(false);
    const {showPrompt, hidePrompt} = useConfirmationPrompt();

    const {removeAccount, lockAccount} = useAccount();

    return (
        <div className={classes.accountActions}>
            <Dropdown classes={{
                dropdownContent: classes.dropdownContent
            }} isOpened={dropdownOpened} onClose={setDropdownOpened} content={(
                <Menu>
                    <MenuItem onClick={() => {
                        lockAccount();
                        setDropdownOpened(false);
                    }}>
                        <MenuItemIcon>
                            <LockIcon/>
                        </MenuItemIcon>
                        Lock wallet
                    </MenuItem>

                    <Link to={'/settings'}>
                        <MenuItem>
                            <MenuItemIcon>
                                <SettingsIcon/>
                            </MenuItemIcon>
                            Settings
                        </MenuItem>
                    </Link>

                    <MenuDivider/>

                    <MenuItem onClick={() => {
                        showPrompt({
                            title: '',
                            message: 'Are you sure you want exit and remove keys from this device?',
                            onCancel: () => {
                                hidePrompt();
                            },
                            onAgree: () => {
                                removeAccount();
                                hidePrompt();
                            }
                        })
                        setDropdownOpened(false);
                    }}>
                        <MenuItemIcon>
                            <RemoveIcon/>
                        </MenuItemIcon>
                        <Typography variant={TypographyColor.DANGER}>Exit and remove</Typography>
                    </MenuItem>
                </Menu>
            )}>
                <IconButton>
                    <MoreIcon onClick={setDropdownOpened}/>
                </IconButton>
            </Dropdown>
        </div>
    )
};

export default AccountActions;
