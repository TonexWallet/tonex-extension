import Modal from "../components/Modal";
import {useState} from "react";
import {useTransition} from 'react-spring';

const useModal = () => {
    const [isVisible, setIsVisible] = useState()

    const show = () => setIsVisible(true);
    const hide = () => setIsVisible(false);

    const transitions = useTransition(isVisible, {
        from: { opacity: 0, transform: 'translateY(-100%)'  },
        enter: { opacity: 1, transform: 'translateY(0%)'  },
        leave: { opacity: 0, transform: 'translateY(-100%)' },
    })

    const RenderModal = ({ children }) => transitions((style, item) => {
       return item && (
           <Modal closeModal={hide} style={style}>{children}</Modal>
       );
    });

    return {
        show,
        hide,
        RenderModal,
    }
}

export default useModal;
