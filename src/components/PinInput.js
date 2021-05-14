import useKeyDown from "../hooks/useKeyDown";
import {useCallback, useEffect, useMemo, useState} from "react";
import {createUseStyles} from 'react-jss';
import clsx from "clsx";
import Typography, {TypographyVariant} from "./Typography";
import IconButton from "./IconButton";
import {ReactComponent as DeleteIcon} from '../img/delete-icon.svg';

const useStyles = createUseStyles({
    pinInput: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column'
    },

    pinDots: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center'
    },

    pinDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        border: '1px solid #0085FF',
        boxSizing: 'border-box',
        margin: 4,
    },

    pinDotActive: {
        backgroundColor: '#0085FF'
    },

    pinKeyboard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32
    },

    keyboardRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    keyboardKey: {
        width: 64,
        height: 64,
        margin: 6,
        borderRadius: 32,
        backgroundColor: '#F3F3F3',
        color: '#2E2E2E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        appearance: 'none',
        outline: 'none',
        cursor: 'pointer',

        '&:active': {
            opacity: 0.6
        }
    },

    keyboardCell: {
        width: 64,
        height: 64,
        margin: 6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const PinInput = ({length = 6, onChange}) => {
    const classes = useStyles();

    const [input, setInput] = useState('');

    useEffect(() => {
        if(input.length === length){
            onChange(input);
            setInput('');
        }
    }, [onChange, input, length])

    const appendInput = useCallback((value) => {
        setInput((currentInput) => currentInput.length < length ? currentInput + value : currentInput);
    }, [length]);

    const clearInput = useCallback((value) => {
        setInput((currentInput) => currentInput.slice(0, -1))
    }, []);

    const onKeyDown = useCallback(({key, ...rest}) => {
        if (key >= 0 && key <= 9) {
            appendInput(key);
        }else if(key === 'Backspace'){
            clearInput();
        }
    }, [appendInput, clearInput]);

    useKeyDown(onKeyDown);

    const dots = useMemo(() => {
        return new Array(length).fill({}).map((item, index) => ({
            active: !!input[index],
        }));
    }, [length, input]);

    return (
        <div className={classes.pinInput}>
            <div className={clsx(classes.pinDots)}>
                {dots.map((dot, index) => (
                    <div key={index} className={clsx(classes.pinDot, {
                        [classes.pinDotActive]: dot.active,
                    })}/>
                ))}
            </div>

            <div className={classes.pinKeyboard}>
                {[[1, 2, 3], [4, 5, 6], [7, 8, 9]].map((row, index) => (
                    <div className={classes.keyboardRow} key={index}>
                        {row.map(keyboardKey => (
                            <button className={classes.keyboardKey} key={keyboardKey} onClick={() => {
                                appendInput(keyboardKey);
                            }}>
                                <Typography variant={TypographyVariant.SUBHEADER}>{keyboardKey}</Typography>
                            </button>
                        ))}
                    </div>
                ))}
                <div className={classes.keyboardRow}>
                    <div className={classes.keyboardCell}/>
                    <button className={classes.keyboardKey} onClick={() => {
                        appendInput(0);
                    }}>
                        <Typography variant={TypographyVariant.SUBHEADER}>0</Typography>
                    </button>
                    <div className={classes.keyboardCell}>
                        <IconButton large onClick={() => {
                            clearInput();
                        }}>
                            <DeleteIcon/>
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PinInput;
