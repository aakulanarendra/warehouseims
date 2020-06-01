import React from 'react';
import clsx from 'clsx';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import {productStyles} from "../ProductStyle";

export default function Packaging(props) {
    const classes = productStyles();


    const {packaging, setPackaging} = props;

    const handleChange = name => event => {
        setPackaging({...packaging, [name]: event.target.value});
    };

    return (
        <div className={classes.root}>
            <Grid container>

                <FormControl disabled fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="material">Packaging Material</InputLabel>
                    <Select
                        name="issueInventoryLocation"
                        value={packaging.material}
                        onChange={handleChange('material')}
                        input={<Input id="material"/>}
                    >
                        <MenuItem value="">
                            <Button variant="outlined" color="primary"
                                    className={classes.button}>
                                Add a Packaging Material
                            </Button>
                        </MenuItem>
                    </Select>

                </FormControl>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs>
                    <TextField
                        id="outlined-dense"
                        label="Packaging Instructions"
                        fullWidth
                        className={clsx(classes.textField, classes.dense)}
                        margin="dense"
                        value={packaging.instructions}
                        onChange={handleChange('instructions')}
                        multiline
                        rowsMax="4"
                        helperText="Instructions on how to pack this product."
                    />
                </Grid>
            </Grid>
        </div>);
}