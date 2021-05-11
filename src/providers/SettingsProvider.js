import {createContext, useContext} from "react";
import useStoreState from "../hooks/useStoreState";

const SettingsProviderContext = createContext({});

export const useSettings = () => {
    return useContext(SettingsProviderContext);
};

const SettingsProvider = ({children}) => {
    const [settings, setSettings] = useStoreState('settings');

    return (
        <SettingsProviderContext.Provider value={{
            settings,
            setSettings
        }}>
            {children}
        </SettingsProviderContext.Provider>
    )
};

export default SettingsProvider;
