const shortenWalletAddress = (address, paddings = [6, 4]) => {
    return `${address.slice(0, paddings[0])}...${address.slice(-paddings[1])}`;
};

export default shortenWalletAddress;
