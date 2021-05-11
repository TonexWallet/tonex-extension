import {createContext, useCallback, useContext, useMemo, useState,} from "react";
import useModal from "../hooks/useModal";
import ConfirmationPrompt from "../components/ConfirmationPrompt";

const ConfirmationPromptProviderContext = createContext({});

export const useConfirmationPrompt = () => {
    return useContext(ConfirmationPromptProviderContext)
};

const ConfirmationPromptProvider = ({children}) => {
    const {show, hide: hidePrompt, RenderModal: ConfirmationModal} = useModal();
    const [promptProps, setPromptProps] = useState();

    const showPrompt = useCallback((props) => {
        setPromptProps(props);
        show();
    }, [show]);

    const providerValue = useMemo(() => ({
        showPrompt,
        hidePrompt
    }), [showPrompt, hidePrompt]);

    return (
        <ConfirmationPromptProviderContext.Provider value={providerValue}>
            {children}
            <ConfirmationModal>
                <ConfirmationPrompt {...promptProps}/>
            </ConfirmationModal>
        </ConfirmationPromptProviderContext.Provider>
    )
};

export default ConfirmationPromptProvider;
