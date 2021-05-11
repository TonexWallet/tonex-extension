/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from "react";

const useKeyDown = (cb) => {
    useEffect(() => {
        window.addEventListener('keydown', cb);
        return () => {
            window.removeEventListener('keydown', cb);
        };
    }, []);
}

export default useKeyDown;
