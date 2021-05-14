import {createUseStyles} from 'react-jss';
import Input from "./Input";
import {ReactComponent as CrystalIcon} from "../img/crystal-icon.svg";

const useStyles = createUseStyles({
    amountInput: {

    },
    maxAmountLabel: {
        width: 48,
        backgroundColor: '#F3F3F3',
        borderRadius: 6,
        color: '#0085FF',
        height: 28,
        fontWeight: 'bold',
        fontSize: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 28,
        cursor: 'pointer'
    }
});

const AmountInput = ({value, onChange}) => {
    useStyles();

    return (
        <Input
            value={value}
            onChange={(e) => {
                onChange(e.target.value)
            }}
            type={'number'}
            startAdornment={(
                <CrystalIcon/>
            )}
        />
    )
};

export default AmountInput;
