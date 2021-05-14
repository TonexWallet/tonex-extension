import Popup from "./components/Popup";
import {createUseStyles} from 'react-jss';
import TonProvider from "./providers/TonProvider";
import {Switch} from 'react-router-dom';
import AccountProvider from "./providers/AccountProvider";
import MemoryRouter from "./components/MemoryRouter";
import Routes from "./Routes";
import WalletsProvider from "./providers/WalletsProvider";
import PasscodePromptProvider from "./providers/PasscodePromptProvider";
import BackgroundProvider from "./providers/BackgroundProvider";
import ConfirmationPromptProvider from "./providers/ConfirmationPromptProvider";

const useStyles = createUseStyles({
    '@global': {
        body: {
            fontFamily: "'IBM Plex Sans', sans-serif",
            margin: 0,
            padding: 0
        },

        a: {
            textDecoration: 'none',
        }
    }
});

const App = () => {
    useStyles();

    return (
        <BackgroundProvider>
            <TonProvider>
                <ConfirmationPromptProvider>
                    <PasscodePromptProvider>
                        <AccountProvider>
                            <WalletsProvider>
                                <Popup>
                                    <MemoryRouter>
                                        <Switch>
                                            <Routes/>
                                        </Switch>
                                    </MemoryRouter>
                                </Popup>
                            </WalletsProvider>
                        </AccountProvider>
                    </PasscodePromptProvider>
                </ConfirmationPromptProvider>
            </TonProvider>
        </BackgroundProvider>
    )
};

export default App;
