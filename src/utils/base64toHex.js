const base64ToHex = (str) => {
    const bin = atob(str.replace(/[ \r\n]+$/, ""));
    let hex = [];
    for (let i = 0; i < bin.length; ++i) {
        let tmp = bin.charCodeAt(i).toString(16);
        if (tmp.length === 1) tmp = "0" + tmp;
        hex[hex.length] = tmp;
    }
    return hex.join('');
}

export default base64ToHex;
