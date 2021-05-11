import {makeStyles} from "@material-ui/styles";
import SeedPhraseWord from "./SeedPhraseWord";
import chunk from 'lodash/chunk';

const useStyles = makeStyles({
    seedPhrase: {
        width: '100%'
    },

    phraseRow: {
        display: 'flex',
    },

    seedPhraseWord: {
        margin: 8,
        flex: 1
    }
});

const SeedPhrase = ({seedPhrase = ''}) => {
    const classes = useStyles();

    const words = seedPhrase.split(' ');
    const rows = chunk(words, 3);

    return (
        <div className={classes.seedPhrase}>
            {rows.map((row, index) => {
                return (
                    <div key={index} className={classes.phraseRow}>
                        {row.map(word => (
                            <div key={word} className={classes.seedPhraseWord}>
                                <SeedPhraseWord word={word}/>
                            </div>
                        ))}
                    </div>
                )
            })}
        </div>
    )
};

export default SeedPhrase;
