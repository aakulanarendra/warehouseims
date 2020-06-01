import React from "react";
import {Paper,} from "@material-ui/core";
import classnames from "classnames";
// styles
import {useTheme} from "@material-ui/styles";
import Icon from "@material-ui/core/Icon";
import useStyles from "./styles";
import {Typography} from "../Wrappers";

export default function ContentWidget({
                                          children,
                                          title,
                                          content,
                                          tbgColor,
                                          bodyClass,
                                          bbgColor,
    icon,
                                          ...props
                                      }) {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className={classes.widgetWrapper}>
            <Paper className={classes.paper} classes={{root: classes.widgetRoot}}>
                <div className={classes.widgetHeader}>
                    <>
                        <Typography variant="h5" color="primary" weight={500}>
                            {title}
                        </Typography>
                    </>
                </div>
                <div
                    style={{backgroundColor: bbgColor, color: "#fff"}}
                    className={classnames(classes.contentWidgetBody, {
                        [bodyClass]: bodyClass,
                    })}
                >
                    <Typography size="xl" weight="medium"  className={classes.wrapIcon}>
                        {{icon} ? <Icon>{icon}</Icon> : ""}  {content}
                    </Typography>
                </div>
                <div className={classes.widgetFooter}>
                    <>
                        <Typography size="sm" color="white" weight={500} >
                            {title}
                        </Typography>
                    </>
                </div>
            </Paper>
        </div>
    );
}
