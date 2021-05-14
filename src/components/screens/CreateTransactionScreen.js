import AddressInput from "../AddressInput";
import {createUseStyles} from 'react-jss';
import {useWallets} from "../../providers/WalletsProvider";
import Button from "../Button";
import {useHistory} from "react-router-dom";
import Avatar from "../Avatar";
import Typography, {TypographyColor, TypographyVariant} from "../Typography";
import shortenWalletAddress from "../../utils/shortenWalletAddress";
import InputLabel from "../InputLabel";
import formatBalance from "../../utils/formatBalance";
import AmountInput from "../AmountInput";
import Textarea from "../Textarea";
import {useCallback, useState} from 'react';
import {usePasscodePrompt} from "../../providers/PasscodePromptProvider";
import {EVENT_TYPE, useBackground} from "../../providers/BackgroundProvider";
import BaseScreen from "../BaseScreen";

const useStyles = createUseStyles({
    transactionForm: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },


    transactionWallet: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    formFooter: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

    confirmTransactionModal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }
});

const CreateTransactionScreen = () => {
    const classes = useStyles();
    const {activeWallet} = useWallets();
    const history = useHistory();
    const {executeBackground} = useBackground();

    const [formData, setFormData] = useState({
        amount: '',
        address: '',
        memo: ''
    });

    const {showPrompt: showPasscode, hide: hidePasscode} = usePasscodePrompt();

    const sendTransaction = useCallback(async(passcode) => {
        const {address: recipient, amount, memo} = formData;
        await executeBackground(EVENT_TYPE.TRANSACTION_SEND, {
            passcode,
            recipient,
            amount,
            memo,
            walletHDPath: activeWallet.hdPath
        });

        history.replace({
            pathname: '/wallet'
        });
    }, [history, activeWallet.hdPath, executeBackground, formData]);

    return (
        <>
            <BaseScreen backAction={(
                <Button link onClick={() => {
                    setFormData({});
                    history.replace({
                        pathname: '/wallet'
                    })
                }}>
                    Cancel
                </Button>
            )} className={classes.createTransactionScreen}>
                <div className={classes.transactionForm}>
                    <div className={classes.transactionWallet}>
                        <Avatar address={activeWallet.address} size={48}/>
                        <Typography variant={TypographyVariant.BODY}>
                            {shortenWalletAddress(activeWallet.address)}
                        </Typography>
                        <Typography variant={TypographyVariant.LABEL} color={TypographyColor.SECONDARY}>
                            Balance: {formatBalance(activeWallet.balance, 3, false)}
                        </Typography>
                    </div>
                    <br/>

                    <InputLabel label={'Send to'}>
                        <AddressInput value={formData.address} onChange={(address) => {
                            setFormData({
                                ...formData,
                                address
                            })
                        }}/>
                    </InputLabel>
                    <br/>

                    <InputLabel label={'Amount'}>
                        <AmountInput value={formData.amount} onChange={(amount) => {
                            setFormData({
                                ...formData,
                                amount
                            })
                        }}/>
                    </InputLabel>
                    <br/>

                    <InputLabel label={'Memo'}>
                        <Textarea maxLength={120} rows={4} value={formData.memo} onChange={(memo) => {
                            setFormData({
                                ...formData,
                                memo
                            })
                        }}/>
                    </InputLabel>
                    <br/>

                    <div className={classes.formFooter}>
                        <Button onClick={() => {
                            showPasscode({
                                onChange: sendTransaction,
                                onCancel: () => {
                                    hidePasscode();
                                }
                            });
                        }}>Proceed</Button>
                    </div>
                </div>
            </BaseScreen>
        </>
    )
};

export default CreateTransactionScreen;
