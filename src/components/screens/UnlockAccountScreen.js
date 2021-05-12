import {usePasscodePrompt} from "../../providers/PasscodePromptProvider";
import {useEffect, useState} from 'react';
import {useAccount} from "../../providers/AccountProvider";
import {EVENT_ERRORS} from "../../providers/BackgroundProvider";

const UnlockAccountScreen = () => {
    const {unlockAccount} = useAccount();
    const {showPrompt: showPasscode, hide: hidePasscode} = usePasscodePrompt();
    const [error, setError] = useState(null);

    useEffect(() => {
        showPasscode({
            onChange: async (passcode) => {
                try{
                    await unlockAccount(passcode);
                    hidePasscode();
                }catch (e){
                    console.log(e);
                    if(e.code === EVENT_ERRORS.ACCOUNT_UNLOCK_ERROR){
                        setError('Wrong passcode');
                    }
                }
            }
        });

        return () => {
            hidePasscode()
        }
        // eslint-disable-next-line
    }, [error, unlockAccount]);

    return (
        <div/>
    )
};

export default UnlockAccountScreen;
