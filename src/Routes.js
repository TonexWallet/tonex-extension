import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import CreateAccountScreen from "./components/screens/CreateAccountScreen";
import RestoreAccountScreen from "./components/screens/RestoreAccountScreen";
import WalletScreen from "./components/screens/WalletScreen";
import WelcomeScreen from "./components/screens/WelcomeScreen";
import {useAccount} from "./providers/AccountProvider";
import UnlockAccountScreen from "./components/screens/UnlockAccountScreen";
import {useWallets} from "./providers/WalletsProvider";
import CreateTransactionScreen from "./components/screens/CreateTransactionScreen";
import ReceiveScreen from "./components/screens/ReceiveScreen";
import SettingsScreen from "./components/screens/SettingsScreen";
import {animated, useTransition} from "react-spring";

const Routes = () => {
    const {initialized, locked} = useAccount();
    const {activeWallet} = useWallets();

    const location = useLocation()
    const transitions = useTransition(location, {
        enter: item => [
            { opacity: 1 },
        ],
        leave: item => async (next, cancel) => {
        },
        from: {
            opacity: 0,
            width: '100%',
            height: '100%',
        },
    });

    return transitions(({opacity, ...props}, item) => (
        <animated.div style={{
            opacity,
            ...props,
            // transform: opacity.to({ range: [0, 1], output: [100, 0]}).to(y => `translate3d(${-y}px, 0, 0)`)
        }}>
            <Switch location={item}>
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
                <Route path="/settings">
                    {locked || !activeWallet ? (
                        <Redirect to={{
                            pathname: '/'
                        }}/>
                    ) : (
                        <SettingsScreen/>
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
            </Switch>
        </animated.div>
    ))
};

export default Routes;
