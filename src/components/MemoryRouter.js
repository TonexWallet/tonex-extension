import {MemoryRouter as Router} from "react-router-dom";
import PersistedRouter from "./PersistedRouter";
import useStoreState from "../hooks/useStoreState";
import isEmpty from "lodash/isEmpty";

const MemoryRouter = ({children}) => {
    const [routerEntries, setRouterEntries, routerEntriesLoaded] = useStoreState('routerEntries', []);

    return routerEntriesLoaded && (
        <Router
            initialEntries={isEmpty(routerEntries) ? undefined : routerEntries}
        >
            <PersistedRouter persistRoutes={setRouterEntries}>
                {children}
            </PersistedRouter>
        </Router>
    )
};

export default MemoryRouter;
