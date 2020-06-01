import React from 'react';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import {productStyles} from "../ProductStyle";


export default function Attributes(props) {
    const classes = productStyles();
    const {attributes, setAttributes} = props;
    const handleChange = name => event => {
        setAttributes({...attributes, [name]: event.target.value});
    };

    return (
        <div className={classes.root}>
            <Grid container>
                <FormControl disabled fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="size"> Product Sizel</InputLabel>
                    <Select
                        name="size"
                        value={attributes.size}
                        onChange={handleChange('size')}
                        input={<Input id="size"/>}
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
            <Grid container>
                <FormControl disabled fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="color"> Product Colour</InputLabel>
                    <Select
                        name="issueInventoryLocation"
                        value={attributes.color}
                        onChange={handleChange('color')}
                        input={<Input id="color"/>}
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
        </div>
    );
}