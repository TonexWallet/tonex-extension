import React from 'react'
import {createPortal} from 'react-dom'
import {createUseStyles} from 'react-jss';

const useStyles = createUseStyles({
    modalRoot: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        width: '100%',
    }
});

const Modal = React.memo(({ children, closeModal }) => {
    const classes = useStyles();
    const domEl = document.getElementById('modal-root');

    if (!domEl) return null

    return createPortal(
        <div className={classes.modalRoot}>
            {children}
        </div>,
        domEl
    )
})

export default Modal;
