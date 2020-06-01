import {makeStyles} from "@material-ui/styles";

export default makeStyles(theme => ({
    widgetWrapper: {
        display: "flex",
        minHeight: "100%",
    },
    widgetHeader: {
        padding: theme.spacing(1),
        // paddingBottom: theme.spacing(1),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontWeight: '600'
    },
    widgetFooter: {
        padding: theme.spacing(1),
        // paddingBottom: theme.spacing(1),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: '600'
    },
    widgetRoot: {
        boxShadow: theme.customShadows.widget,
    },
    widgetBody: {
        paddingBottom: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
    },
    contentWidgetBody: {
        padding: theme.spacing(3),
        justifyContent: "center",
        alignItems: "center",
        minHeight: "130px",
    },
    noPadding: {
        padding: 0,
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        overflow: "hidden",
    },
    moreButton: {
        margin: -theme.spacing(1),
        padding: 0,
        width: 40,
        height: 40,
        color: theme.palette.text.hint,
        "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: "rgba(255, 255, 255, 0.35)",
        },
    },
    wrapIcon: {
        // width: theme.typography.body1.fontSize,
        // height: theme.typography.body1.fontSize
    }
}));
