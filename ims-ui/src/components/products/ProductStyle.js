import {makeStyles} from "@material-ui/core";

export const productStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        // backgroundColor: theme.palette.background.paper,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    productOverview: {
        backgroundColor: 'rgba(133,175,255,0.17)',
        padding: '20px',
        minHeight: '90vH',
        borderLeft: '1px solid lightgrey'
    },
    listItemText: {
        fontSize: '2.1em',
    },
    primaryListItem: {
        fontSize: '0.85em',
    },
    productContainer: {
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
    input: {
        display: 'none',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },

}));