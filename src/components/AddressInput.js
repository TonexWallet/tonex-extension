import {createUseStyles} from 'react-jss';
import shortenWalletAddress from "../utils/shortenWalletAddress";
import {useRef, useState} from 'react';
import Typography, {TypographyVariant} from "./Typography";
import Avatar from "./Avatar";
import IconButton from "./IconButton";
import {ReactComponent as DropdownIcon} from '../img/dropdown-icon.svg';
import Dropdown from "./Dropdown";
import Menu from "./Menu";
import MenuItem from "./MenuItem";

const useStyles = createUseStyles({
    addressInput: {
        width: '100%',
        position: 'relative',
        boxSizing: 'border-box',
        display: 'flex',
        height: 36,
        border: '1px solid #F3F3F3',
        borderRadius: 6,
        overflow: 'hidden',
        padding: '0 4px'
    },

    inputField: {
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        fontFamily: "'IBM Plex Sans', sans-serif",
        color: '#2E2E2E',
        fontWeight: 'bold',
        fontSize: '12px',
        lineHeight: '16px',
        border: 0,
        outline: 'none',
        padding: 0,
        margin: 0,
        paddingBottom: 1,
    },

    valueLabel: {
        visibility: 'visible',
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        cursor: 'text'
    },

    valueLabelHidden: {
        visibility: 'hidden'
    },

    inputStartAddon: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 2px'
    },

    inputEndAddon: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 2px'
    },

    inputContent: {
        width: '100%',
        position: 'relative',
        padding: '0 4px'
    },

    dropdownContent: {
        width: 200,
        right: 0,
        top: 8,
        left: 'initial'
    },

    accountItemLabel: {
        marginLeft: 12,
    },
});

const AddressInput = ({value, onChange, options = []}) => {
    const classes = useStyles();
    const [, setInFocus] = useState();
    const inputFieldRef = useRef();
    const [dropdownOpened, setDropdownOpened] = useState(false);

    return (
        <>
            <div className={classes.addressInput}>
                {value && (
                    <div className={classes.inputStartAddon}>
                        <Avatar size={24} address={value}/>
                    </div>
                )}

                <div className={classes.inputContent}>
                    {/*<Typography*/}
                    {/*    variant={TypographyVariant.BODY2}*/}
                    {/*    onClick={() => {*/}
                    {/*        setInFocus(true);*/}
                    {/*        inputFieldRef.current.focus();*/}
                    {/*        inputFieldRef.current.select();*/}
                    {/*    }}*/}
                    {/*    className={clsx(classes.valueLabel, {*/}
                    {/*        [classes.valueLabelHidden]: inFocus*/}
                    {/*    })}>*/}
                    {/*    {shortenWalletAddress(value, [14, 12])}*/}
                    {/*</Typography>*/}

                    <input
                        ref={inputFieldRef}
                        className={classes.inputField}
                        value={value}
                        onChange={(e) => {
                            onChange(e.target.value)
                        }}
                        onFocus={() => {
                            setInFocus(true);
                        }}
                        onBlur={() => {
                            setInFocus(false);
                        }}
                    />
                    <div/>
                </div>

                {options.length ? (
                    <div className={classes.inputEndAddon}>
                        <IconButton onClick={() => setDropdownOpened(true)}>
                            <DropdownIcon/>
                        </IconButton>
                    </div>
                ) : null}
            </div>

            {options.length ? (
                <Dropdown classes={{
                    dropdownContent: classes.dropdownContent
                }} isOpened={dropdownOpened} onClose={setDropdownOpened} content={(
                    <Menu>
                        {options.map(address => (
                            <MenuItem onClick={() => {
                                setDropdownOpened(false);
                            }}>
                                <Avatar address={address} size={18}/>
                                <Typography className={classes.accountItemLabel} variant={TypographyVariant.BODY2}>{shortenWalletAddress(address, [8, 6])}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                )}/>
            ) : null}
        </>
    )
};

export default AddressInput;
