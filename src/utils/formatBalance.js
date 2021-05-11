import Big from "../lib/Big";

const formatBalance = (value = 0, fractionDigits = 9, split = true) => {
    // eslint-disable-next-line no-undef
    const balance = new Big(BigInt(value).toString());

    const divided = balance.div(new Big(1_000_000_000)).toFixed(fractionDigits).toString();

    if(!split){
        return divided;
    }

    const splitted = divided.split('.');

    return {
        amount: splitted[0],
        decimal: (splitted[1] || 0)
    }
};

export default formatBalance;
