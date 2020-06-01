import {makeStyles} from "@material-ui/core";

export const Styles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        // backgroundColor: theme.palette.background.paper,
    },
    overview: {
        // backgroundColor: 'rgba(133,175,255,0.17)',
        padding: '20px',
        minHeight: '90vH',
        borderLeft: '1px solid lightgrey',
        boxShadow: '0 3px 5px 2px rgba(84, 81, 82, 0.3)'
    },
    listItemText: {
        fontSize: '2.1em',
    },
    primaryListItem: {
        fontSize: '0.85em',
    },
    container: {
        padding: '24px',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        flexBasis: 200,
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    margin: {
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
        flexWrap: 'wrap',
    },
    title: {
        flexGrow: 1,
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
    iconSmall: {
        fontSize: 20,
    },
    shadowContainer: {
        margin: theme.spacing(3),
        padding: theme.spacing(3, 2),
        boxShadow: '0 3px 5px 2px rgba(84, 81, 82, 0.3)'
    },
    mainContainer: {
        background: '#fff',
        padding: '24px',
        boxShadow: '4px 4px 20px 0 rgba(0, 0, 0, 0.01)',
        minHeight: 'calc(100vh - 230px)',
        position: 'relative'
    },
    content: {
        lineHeight: '2.4',
        fontSize: '13px',
    },
    item: {
        display: 'flex',
        '& > div': {
            '&:first-child': {
                width: '150px'
            }
        }
    },
    header:{
        marginBottom: '20px'
    }

}));