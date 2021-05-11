import useModal from "../hooks/useModal";
import PinPrompt from "./PinPrompt";
import {useCallback, useEffect, useState} from "react";

const CreatePinPrompt = ({onDone, onCancel, isOpen}) => {
    const {show: showCreatePin, hide: hideCreatePin, RenderModal: CreatePinModal} = useModal();
    const {show: showRepeatPin, hide: hideRepeatPin, RenderModal: RepeatPinModal} = useModal();
    const [pin, setPin] = useState();

    const comparePin = useCallback(async (repeatPin) => {
        if(repeatPin === pin){
            hideRepeatPin();
            await onDone(pin);
        }else{

        }
    }, [hideRepeatPin, onDone, pin]);

    useEffect(() => {
        if(isOpen){
            showCreatePin();
        }else{
            hideCreatePin();
            hideRepeatPin();
        }
    }, [hideCreatePin, hideRepeatPin, isOpen, showCreatePin])

    return (
        <>
            <CreatePinModal>
                <PinPrompt
                    onCancel={onCancel}
                    label={'Create your Pin'}
                    onChange={(value) => {
                        setPin(value)
                        showRepeatPin();
                        hideCreatePin();
                    }}/>
            </CreatePinModal>
            <RepeatPinModal>
                <PinPrompt
                    onCancel={() => {
                        hideRepeatPin();
                    }}
                    label={'Repeat your pin'}
                    onChange={comparePin}/>
            </RepeatPinModal>
        </>
    )
};

export default CreatePinPrompt;
