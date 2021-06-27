import {useAccount} from "../../providers/AccountProvider";
import {useCallback, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import useModal from "../../hooks/useModal";
import SeedPhraseModal from "../SeedPhraseModal";
import SeedPhraseConfirmationModal from "../SeedPhraseConfirmationModal";
import CreatePinPrompt from "../CreatePinPrompt";
import BaseScreen from "../BaseScreen";

const CreateAccountScreen = () => {
    const {createAccount, generateSeedPhrase} = useAccount();

    const history = useHistory();

    const {show: showSeedPhrase, hide: hideSeedPhrase, RenderModal: RenderSeedPhraseModal} = useModal();
    const {show: showSeedPhraseConfirmation, hide: hideSeedPhraseConfirmation, RenderModal: RenderSeedPhraseConfirmationModal} = useModal();

    const [seedPhrase, setSeedPhrase] = useState(null);
    const [pin, setPin] = useState(null);

    const onGenerateSeedPhrase = useCallback(async () => {
        const seedPhrase = await generateSeedPhrase();
        setSeedPhrase(seedPhrase);
    }, [generateSeedPhrase]);

    const onConfirmed = useCallback(async() => {
        await createAccount({
            seedPhrase,
            passcode: pin
        });
    }, [createAccount, pin, seedPhrase]);

    const [isOpenCretePin, setIsOpenCreatePin] = useState(false);

    useEffect(() => {
        setIsOpenCreatePin(true);
    }, []);

    return (
        <BaseScreen>
            <CreatePinPrompt
                isOpen={isOpenCretePin}
                onCancel={() => {
                    history.replace('/');
                }}
                onDone={async (pin) => {
                    setPin(pin);
                    await onGenerateSeedPhrase();
                    await showSeedPhrase();
                }}/>

            <RenderSeedPhraseModal>
                <SeedPhraseModal
                    onCancel={() => {
                        hideSeedPhrase();
                    }}
                    onApplied={() => {
                        showSeedPhraseConfirmation();
                    }}
                    seedPhrase={seedPhrase}/>
            </RenderSeedPhraseModal>
            <RenderSeedPhraseConfirmationModal>
                <SeedPhraseConfirmationModal
                    onConfirmed={onConfirmed}
                    onCancel={() => {
                        hideSeedPhraseConfirmation();
                    }}
                    seedPhrase={seedPhrase}/>
            </RenderSeedPhraseConfirmationModal>
        </BaseScreen>
    )
};

export default CreateAccountScreen;
