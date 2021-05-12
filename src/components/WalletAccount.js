import {makeStyles} from "@material-ui/styles";
import {ReactComponent as CopyIcon} from '../img/copy-icon.svg';
import Typography, {TypographyColor, TypographyVariant} from "./Typography";
import shortenWalletAddress from "../utils/shortenWalletAddress";
import {useCallback, useRef, useState} from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import {usePasscodePrompt} from "../providers/PasscodePromptProvider";
import {useWallets} from "../providers/WalletsProvider";
import Avatar from "./Avatar";
import Dropdown from "./Dropdown";
import IconButton from "./IconButton";
import useCopy from "@react-hook/copy";
import {ReactComponent as DropdownIcon} from '../img/dropdown-icon.svg';

const useStyles = makeStyles({
    account: {
        display: 'flex',
        alignItems: 'center'
    },

    accountAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 4,
        marginLeft: 4,
        boxSizing: 'border-box'
    },

    accountDropdown: {
        display: 'flex',
        alignItems: 'center',
        padding: '4px 6px',
        cursor: 'pointer',
        borderRadius: '16px',
    },

    accountDropdownLabel: {
        padding: '4px 0px',
        display: 'flex',
        alignItems: 'center',

        '&>*': {
            fontSize: '18px'
        }
    },

    accountItemAvatar: {
        width: 22,
        height: 22
    },

    accountItemLabel: {
        marginLeft: 12,
    },
});

const WalletAccount = ({activeWallet, availableWallets = []}) => {
    const classes = useStyles();

    const [accountDropdownOpened, setAccountDropdownOpened] = useState();
    const dropdownRef = useRef();
    const {showPrompt, hide} = usePasscodePrompt();
    const {createWallet, switchWallet} = useWallets();

    const {copy} = useCopy(
        activeWallet && activeWallet.address
    );

    useOnClickOutside(dropdownRef, () => setAccountDropdownOpened(false));

    const onCreate = useCallback(() => {
        setAccountDropdownOpened(false);

        showPrompt({
            onChange: (passcode) => {
                createWallet({passcode});
            },
            onCancel: () => {
                hide();
            }
        })
    }, [createWallet, hide, showPrompt]);

    return (
        <div className={classes.account}>
            <Avatar className={classes.accountAvatar} address={activeWallet.address}/>

            <Dropdown className={classes.accountDropdown} isOpened={accountDropdownOpened} onClose={setAccountDropdownOpened} content={(
                <Menu>
                    {availableWallets.map(wallet => {
                        return (
                            <MenuItem key={wallet.address} onClick={() => {
                                setAccountDropdownOpened(false);
                                switchWallet(wallet.hdPath);
                            }}>
                                <Avatar address={wallet.address} className={classes.accountItemAvatar}/>
                                <Typography className={classes.accountItemLabel}>{shortenWalletAddress(wallet.address)}</Typography>
                            </MenuItem>
                        )
                    })}

                    <MenuItem onClick={onCreate}>
                        <Typography variant={TypographyVariant.BODY2} color={TypographyColor.BRAND}>Create wallet</Typography>
                    </MenuItem>
                </Menu>
            )}>
                <div className={classes.accountDropdownLabel}  onClick={() => {
                    setAccountDropdownOpened(true);
                }}>
                    <Typography variant={TypographyVariant.BODY} color={TypographyColor.PRIMARY}>
                        {shortenWalletAddress(activeWallet.address)}
                    </Typography>
                    &nbsp;
                    <DropdownIcon/>
                </div>
            </Dropdown>

            <IconButton onClick={() => {
                copy();
            }}>
                <CopyIcon/>
            </IconButton>
        </div>
    )
};

export default WalletAccount;
