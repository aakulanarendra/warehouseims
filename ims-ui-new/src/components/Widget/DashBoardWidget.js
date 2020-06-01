import React from "react";
import {Paper,} from "@material-ui/core";
import classnames from "classnames";
// styles
import {useTheme} from "@material-ui/styles";
import useStyles from "./styles";
import {Typography} from "../Wrappers";

export default function DashboardWidget({
                                            children,
                                            title,
                                            noBodyPadding,
                                            bodyClass,
                                            disableWidgetMenu,
                                            tbgColor,
                                            header,
                                            ...props
                                        }) {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className={classes.widgetWrapper}>
            <Paper className={classes.paper} classes={{root: classes.widgetRoot}}>
                <div style={{ backgroundColor: tbgColor,color:"#fff" }} className={classes.widgetHeader}>
                    <>
                        <Typography variant="h5" color="white" weight={500}>
                            {title}
                        </Typography>
                    </>
                </div>
                <div
                    className={classnames(classes.widgetBody, {
                        [classes.noPadding]: noBodyPadding,
                        [bodyClass]: bodyClass,
                    })}
                >
                    {children}
                </div>
            </Paper>
        </div>
    );
}
