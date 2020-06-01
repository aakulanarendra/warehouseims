import {makeStyles} from "@material-ui/core/index";

export const browseStyles = makeStyles(theme => ({
    root: {
        overflow: 'hidden',
        "display": 'flex',
        "flexWrap": 'wrap',
        "justifyContent": 'space-around',
    },
    // root: {
    //     display: 'flex',
    //     flexWrap: 'wrap',
    //     justifyContent: 'space-around',
    //     overflow: 'hidden',
    //     backgroundColor: theme.palette.background.paper,
    // },
    gridList: {
        width: '100%',
        height: '100%',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
        shopNext:{
            color: '#fff',
        },
    paper: {
        padding: theme.spacing(1),
        marginBottom: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    button: {

    },
    input: {
        display: 'none',
    },
    green: {
        color: '#38b738'
    },
    navbar:{
        backgroundColor:theme.palette.common.white,
        color:theme.palette.common.black,
        marginTop:"-24px"
    }

}));