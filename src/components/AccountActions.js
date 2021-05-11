import {makeStyles} from "@material-ui/styles";
import {ReactComponent as MoreIcon} from '../img/more-vertical-icon.svg';
import IconButton from "./IconButton";
import Dropdown from "./Dropdown";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import {useState} from 'react';
import {useConfirmationPrompt} from "../providers/ConfirmationPromptProvider";
import {useAccount} from "../providers/AccountProvider";

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
                    }}>Lock wallet</MenuItem>

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
                    }}>Exit</MenuItem>
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
