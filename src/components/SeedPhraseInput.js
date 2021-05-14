import {createUseStyles} from 'react-jss';
import Typography, {TypographyColor, TypographyVariant} from "./Typography";
import fill from 'lodash/fill';
import assign from 'lodash/assign';
import chunk from 'lodash/chunk';
import without from 'lodash/without';
import {useCallback, useEffect, useMemo, useState} from "react";
import SeedPhraseWord from "./SeedPhraseWord";
import clsx from "clsx";

const useStyles = createUseStyles({
    seedPhraseInput: {
        width: '100%'
    },

    wordsSlots: {
        display: 'flex',
        flexDirection: 'column'
    },

    selectedWordsSlots: {

    },

    availableWordsSlots: {

    },

    phraseRow: {
        display: 'flex',
    },

    seedPhraseSlot: {
        margin: 4,
        flex: 1,
        cursor: 'pointer',
        boxSizing: 'border-box',
        height: 36,
        border: '1px solid transparent'
    },

    seedPhraseSlotEmpty: {
        borderRadius: 8,
        borderStyle: 'dashed',
        borderColor: '#e5e5e5',
        borderWidth: 1,
    },

    seedPhraseSelectedWord: {
        backgroundColor: '#0085FF',
        color: '#fff'
    },

    seedPhraseInputLabel: {
        display: 'flex',
        justifyContent: 'center',
        padding: '16px 0'
    }
});

const SeedPhraseInput = ({words, onChange}) => {
    const [selectedWords, setSelectedWords] = useState([]);
    const classes = useStyles();

    const selectedWordsRows = useMemo(() => chunk(assign(fill(new Array(12), null), selectedWords), 3), [selectedWords]);

    const availableWords = chunk(words, 3);

    const isWordSelected = useCallback((word) => {
        return selectedWords.findIndex(item => item === word) !== -1;
    }, [selectedWords]);

    const selectWord = useCallback((word) => {
        setSelectedWords(currentSelectedWords => ([
            ...currentSelectedWords,
            word
        ]));
    }, []);

    const unSelectWord = useCallback((word) => {
        setSelectedWords(currentSelectedWords => {
            return without(currentSelectedWords, word)
        });
    }, []);

    useEffect(() => {
        onChange(selectedWords.join(' '));
    }, [onChange, selectedWords]);

    return (
        <div className={classes.seedPhraseInput}>
            <div className={clsx(classes.selectedWordsSlots, classes.wordsSlots)}>
                {selectedWordsRows.map((row, rowIndex) => {
                    return (
                        <div key={rowIndex} className={classes.phraseRow}>
                            {row.map((word, index) => {
                                return (
                                    <div key={index} onClick={() => {
                                        if(word){
                                            unSelectWord(word)
                                        }
                                    }} className={clsx(classes.seedPhraseSlot, {
                                        [classes.seedPhraseSlotEmpty]: !word
                                    })}>
                                        {word && <SeedPhraseWord className={classes.seedPhraseSelectedWord} word={word}/>}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
            <Typography variant={TypographyVariant.BODY} color={TypographyColor.SECONDARY} className={classes.seedPhraseInputLabel}>
                Tap on the words in the right order
            </Typography>
            <div className={clsx(classes.availableWordsSlots, classes.wordsSlots)}>
                {availableWords.map((row, index) => {
                    return (
                        <div key={index} className={classes.phraseRow}>
                            {row.map(word => {
                                const wordSelected = isWordSelected(word);

                                return (
                                    <div onClick={() => {
                                        if(!wordSelected){
                                            selectWord(word)
                                        }
                                    }} key={word} className={clsx(classes.seedPhraseSlot, {
                                        [classes.seedPhraseSlotEmpty]: wordSelected
                                    })}>
                                        {!wordSelected && (
                                            <SeedPhraseWord word={word}/>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default SeedPhraseInput;
