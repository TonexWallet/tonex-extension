import {useLocation} from "react-router";
import {useEffect} from "react";

const PersistedRouter = ({persistRoutes, children}) => {
    const location = useLocation();

    useEffect(() => {
        persistRoutes([location])
    }, [persistRoutes, location]);

    return (
        children
    )
};

export default PersistedRouter;
