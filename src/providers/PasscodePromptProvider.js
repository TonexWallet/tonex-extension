import {createContext, useMemo, useCallback, useContext, useState,} from "react";
import PinPrompt from "../components/PinPrompt";
import useModal from "../hooks/useModal";

const PasscodePromptProviderContext = createContext({});

export const usePasscodePrompt = () => {
    return useContext(PasscodePromptProviderContext)
};

const PasscodePromptProvider = ({children}) => {
    const [pin, setPin] = useState();
    const {show, hide, RenderModal: PasscodeModal} = useModal();
    const [promptProps, setPromptProps] = useState();

    const showPrompt = useCallback((props) => {
        setPromptProps(props);
        show();
    }, [show]);

    const providerValue = useMemo(() => ({
        showPrompt,
        pin,
        hide
    }), [showPrompt, pin, hide]);

    return (
        <PasscodePromptProviderContext.Provider value={providerValue}>
            {children}
            <PasscodeModal>
                <PinPrompt
                    label={"Enter passcode"}
                    {...promptProps}
                    onChange={(value) => {
                        setPin(value);
                        hide();
                        promptProps.onChange && promptProps.onChange(value)
                    }}/>
            </PasscodeModal>
        </PasscodePromptProviderContext.Provider>
    )
};

export default PasscodePromptProvider;
