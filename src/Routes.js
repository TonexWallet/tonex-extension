import {Redirect, Route} from "react-router-dom";
import CreateAccountScreen from "./components/screens/CreateAccountScreen";
import RestoreAccountScreen from "./components/screens/RestoreAccountScreen";
import WalletScreen from "./components/screens/WalletScreen";
import WelcomeScreen from "./components/screens/WelcomeScreen";
import {useAccount} from "./providers/AccountProvider";
import UnlockAccountScreen from "./components/screens/UnlockAccountScreen";
import {useWallets} from "./providers/WalletsProvider";
import CreateTransactionScreen from "./components/screens/CreateTransactionScreen";
import ReceiveScreen from "./components/screens/ReceiveScreen";

const Routes = () => {
    const {initialized, locked} = useAccount();
    const {activeWallet} = useWallets();

    return (
        <>
            <Route path={"/account/create"}>
                {initialized ? (
                    <Redirect to={{
                        pathname: '/'
                    }}/>
                ) : <CreateAccountScreen/>}
            </Route>
            <Route path="/account/restore">
                {initialized ? (
                    <Redirect to={{
                        pathname: '/'
                    }}/>
                ) : <RestoreAccountScreen/>}
            </Route>
            <Route path="/transaction/create">
                {locked || !activeWallet ? (
                    <Redirect to={{
                        pathname: '/'
                    }}/>
                ) : (
                    <CreateTransactionScreen/>
                )}
            </Route>
            <Route path="/receive">
                {locked || !activeWallet ? (
                    <Redirect to={{
                        pathname: '/'
                    }}/>
                ) : (
                    <ReceiveScreen/>
                )}
            </Route>

            <Route path="/wallet">
                {locked || !activeWallet ? (
                    <Redirect to={{
                        pathname: '/'
                    }}/>
                ) : (
                    <WalletScreen/>
                )}
            </Route>

            <Route path="/" exact>
                {initialized ? (
                    locked || !activeWallet ? (
                        <UnlockAccountScreen/>
                    ) : (
                        <Redirect to={{
                            pathname: `/wallet`
                        }}/>
                    )
                ) : (
                    <WelcomeScreen/>
                )}
            </Route>
        </>
    )
};

export default Routes;
