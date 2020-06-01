import React from 'react';
import clsx from 'clsx';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import { productStyles } from "../ProductStyle";

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
        <Grid container spacing={2}>
            {inputDimensions.map((dimension, index) => {
                return (
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant={"outlined"}
                            margin="dense"
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
    );
}