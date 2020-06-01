import React from 'react';
import clsx from 'clsx';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { productStyles } from "../ProductStyle";

export default function Logistics(props) {
    const classes = productStyles();
    // const [logistics, setLogistics] = React.useState(0);

    const {logistics, setLogistics} = props;

    const handleChange = name => event => {
        setLogistics({...logistics, [name]: event.target.value});
    };

    return (

        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <FormControl disabled fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="issueInventoryLocation">Issue Inventory Location</InputLabel>
                    <Select
                        name="issueInventoryLocation"
                        value={logistics.issueInventoryLocation}
                        onChange={handleChange('issueInventoryLocation')}
                        input={<Input id="issueInventoryLocation"/>}
                    >
                        <MenuItem value="">
                            <Button variant="outlined" color="primary"
                                    className={classes.button}>
                                Add a Location
                            </Button>
                        </MenuItem>
                    </Select>

                </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
                <FormControl disabled fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="receiveInventoryLocation">Receive Inventory Location</InputLabel>
                    <Select
                        name="receiveInventoryLocation"
                        value={logistics.receiveInventoryLocation}
                        onChange={handleChange('receiveInventoryLocation')}
                        input={<Input id="receiveInventoryLocation"/>}
                    >
                        <MenuItem value="">
                            <Button variant="outlined" color="primary"
                                    className={classes.button}>
                                Add a Location
                            </Button>
                        </MenuItem>
                    </Select>

                </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
                <TextField
                    id="outlined-dense"
                    label="Sales Forecast"
                    fullWidth
                    margin="dense"
                    variant={"outlined"}
                    className={clsx(classes.textField, classes.dense)}
                    value={logistics['salesForecast']}
                    onChange={handleChange('salesForecast')}
                />

            </Grid>
            <Grid item xs={12} md={12}>
                <TextField
                    id="outlined-dense"
                    label="Lead Time"
                    fullWidth
                    margin="dense"
                    variant={"outlined"}
                    className={clsx(classes.textField, classes.dense)}
                    value={logistics['leadTime']}
                    onChange={handleChange('leadTime')}
                />
            </Grid>
        </Grid>

    );
}