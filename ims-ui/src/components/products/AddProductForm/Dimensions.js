import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputAdornment from "@material-ui/core/InputAdornment";
import {productStyles} from "../ProductStyle";

export default function Dimensions(props) {
    const classes = productStyles();

    const {dimensions, setDimensions} = props;

    const handleChange = name => event => {
        setDimensions({...dimensions, [name]: event.target.value});
    };

    const inputDimensions = [
        {
            field: 'weight',
            label: "Weight",
            adornment: "Kg"
        },
        {
            field: 'height',
            label: "Height",
            adornment: "cm"
        },
        {
            field: 'width',
            label: "Width",
            adornment: "cm"
        },
        {
            field: 'depth',
            label: "Depth",
            adornment: "cm"
        }
    ];


    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                {inputDimensions.map((dimension, index) => {
                    return(
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                id={dimension.field}
                                className={clsx(classes.margin, classes.textField)}
                                label={dimension.label}
                                value={dimensions[dimension.field]}
                                onChange={handleChange(dimension.field)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">{dimension.adornment}</InputAdornment>,
                                }}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    );
}