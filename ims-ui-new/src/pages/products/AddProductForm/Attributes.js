import React from 'react';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import {productStyles} from "../ProductStyle";
import AddAttribute from "../../config/attributes/AddAttribute";


export default function Attributes(props) {
    const classes = productStyles();
    const {attributes, setAttributes} = props;

    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState('colour');

    const openAddModal = (type) => {
        setType(type);
        setOpen(true);
    }

    const updateData = (data) => {
        let updatedData;
        if (type === 'colour') {
            const colours = [...attributes.colours || [], data]
            updatedData = {...attributes, 'colours': colours}
        } else {
            const sizes = [...attributes.sizes || [], data]
            updatedData = {...attributes, 'sizes': sizes}
        }
        setAttributes(updatedData);
    };

    const handleChange = name => event => {
        setAttributes({...attributes, [name]: event.target.value});
    };

    return (
        <div className={classes.root}>
            <Grid container>

                <FormControl variant='outlined' fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="category">Size</InputLabel>
                    <Select
                        required
                        name="size"
                        value={attributes.size || ''}
                        onChange={handleChange('size')}
                        input={<Input id="size"/>}
                    >
                        <MenuItem value="">
                            <Button variant="outlined" color="primary" onClick={() => openAddModal('size')}
                                    className={classes.button}>
                                Add a Size
                            </Button>
                        </MenuItem>
                        {attributes.sizes && attributes.sizes.map((field, index) => {
                            return (
                                <MenuItem key={index} value={field.sizeCode}>{field.name}</MenuItem>
                            )
                        })}
                    </Select>

                </FormControl>
            </Grid>
            <Grid container>
                <FormControl variant='outlined' fullWidth className={classes.formControl}>
                    <InputLabel htmlFor="category">Colour</InputLabel>
                    <Select
                        required
                        name="colour"
                        value={attributes.colour || ''}
                        onChange={handleChange('colour')}
                        input={<Input id="colour"/>}
                    >
                        <MenuItem value="">
                            <Button variant="outlined" color="primary" onClick={() => openAddModal('colour')}
                                    className={classes.button}>
                                Add New Colour
                            </Button>
                        </MenuItem>
                        {attributes.colours && attributes.colours.map((field, index) => {
                            return (
                                <MenuItem key={index} value={field.colourCode}>{field.name}</MenuItem>
                            )
                        })}
                    </Select>

                </FormControl>
            </Grid>

            {open && <AddAttribute open={open} setOpen={setOpen} updateData={updateData} type={type}/>}
        </div>
    );
}