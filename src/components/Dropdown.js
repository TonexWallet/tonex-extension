import {useRef} from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import clsx from "clsx";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    dropdownContent: {
        position: 'absolute',
        boxSizing: 'border-box',
        top: 0,
        left: 0,
        backgroundColor: "#fff",
        minWidth: 160,
        visibility: 'hidden',
        borderRadius: 12,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        zIndex: 1
    },
    dropdown: {
        boxSizing: 'border-box',
        position: 'relative',
    },
    dropdownOpened: {
        '&>$dropdownContent': {
            visibility: 'visible'
        }
    }
})

const Dropdown = ({isOpened, onClose, content, className, classes: classesOverride = {}, children}) => {
    const classes = useStyles();
    const dropdownRef = useRef();
    useOnClickOutside(dropdownRef, () => onClose(false));

    return (
        <div className={clsx(classes.dropdown, {
            [classes.dropdownOpened]: isOpened
        }, classesOverride.className, className)}>
            {children}

            <div className={clsx(classes.dropdownContent, classesOverride.dropdownContent)} ref={dropdownRef}>
                {content}
            </div>
        </div>
    )
};

export default Dropdown;
