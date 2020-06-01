import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import {MTableToolbar} from "material-table";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {Add as AddIcon} from "@material-ui/icons";
import useStyles from "./styles";
import IconButton from "@material-ui/core/IconButton";


export default function TableToolbar(props) {
    const classes = useStyles();
    const {to} = props;
    const {addLabel} = props;

    return (
        <div className={classes.root}>
            <Toolbar style={{padding: '5px', width: '100%', justifyContent: 'space-between'}}>
                <MTableToolbar {...props} />
                <IconButton component={Link} to={to} variant="outlined" color="primary">
                    <AddIcon/>
                </IconButton>
            </Toolbar>
        </div>
    );
}

