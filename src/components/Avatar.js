import {makeStyles} from "@material-ui/styles";
import randomColor from '../lib/randomColor';
import clsx from "clsx";

const useStyles = makeStyles({
    avatar: {
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#fff',
        // boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.2)',
        border: '1px solid #fff',
        boxSizing :'border-box'
    },

    avatarBackground: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },

    avatarLetter: {
        fontSize: '100px',
        position: 'absolute',
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontWeight: 'bold',
        mixBlendMode: 'overlay',
        transform: 'rotate(36deg)',
    }
});

const Avatar = ({address, size = 36, className}) => {
    const classes = useStyles();

    const backgroundColor = randomColor({
        luminosity: 'light',
        alpha: 0.3,
        format: 'rgba',
        seed: address
    });

    const letters = [
       {
            letter: address[2],
            color: randomColor({
                luminosity: 'dark',
                hue: '#FF005C',
                seed: address
            })
        },{
            letter: address[3],
            color: randomColor({
                luminosity: 'dark',
                // hue: '#2E2E2E',
                seed: address
            })
        },{
            letter: address[address.length - 2],
            color: randomColor({
                luminosity: 'bright',
                hue: '#0085FF',
                seed: address
            })
        }, {
            letter: address[address.length - 1],
            color: randomColor({
                luminosity: 'dark',
                // hue: '#2E2E2E',
                seed: address
            })
        }
    ];

    return (
        <div className={clsx(classes.avatar, className)}>
            <div className={classes.avatarBackground} style={{
                backgroundColor,
                height: size,
                width: size,
                borderRadius: size / 2
            }}>
                {letters.map((item, index) => (
                    <div key={index} className={classes.avatarLetter} style={{
                        color: item.color,
                        fontSize: `${size * 2.7}px`
                    }}>{item.letter}</div>
                ))}
            </div>
        </div>
    )
};

export default Avatar;
