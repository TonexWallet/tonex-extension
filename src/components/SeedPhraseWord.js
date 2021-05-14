import {createUseStyles} from 'react-jss';
import clsx from "clsx";

const useStyles = createUseStyles({
    seedPhraseWord: {
        backgroundColor: '#f9f9f9',
        fontWeight: 500,
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#2E2E2E',
        height: 36,
        borderRadius: 8,
        boxSizing: 'border-box',
    }
});

const SeedPhraseWord = ({className, word}) => {
    const classes = useStyles();

    return (
        <div className={clsx(classes.seedPhraseWord, className)}>
            {word}
        </div>
    )
};

export default SeedPhraseWord;
