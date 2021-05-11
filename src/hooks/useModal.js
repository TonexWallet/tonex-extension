import Modal from "../components/Modal";
import {useState} from "react";

const useModal = () => {
    const [isVisible, setIsVisible] = useState()

    const show = () => setIsVisible(true)
    const hide = () => setIsVisible(false)

    const RenderModal = ({ children }) => (
        <>
            {isVisible && <Modal closeModal={hide}>{children}</Modal>}
        </>
    )

    return {
        show,
        hide,
        RenderModal,
    }
}

export default useModal;
