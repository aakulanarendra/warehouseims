import React, {useState} from 'react';
import clsx from 'clsx';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Input from "@material-ui/core/Input";
import {productStyles} from "../ProductStyle";
import {post} from "../../../utils/client";
import * as Constants from "../../../utils/constants";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {DatePicker} from "@material-ui/pickers/DatePicker";
import MuiPickersUtilsProvider from "@material-ui/pickers/MuiPickersUtilsProvider";
import DateFnsUtils from "@date-io/date-fns";

const attributeUrl = Constants.ATTRIBUTES_ADD_URL


export default function Basic(props) {
    const classes = productStyles();
    const {basicInfo, setBasicInfo, attributes, setAttributes} = props;
    const [open, setOpen] = React.useState(false);
    const [dialogObj, setDialogObj] = React.useState({});
    const [attribute, setAttribute] = React.useState();
    const [selectedDate, handleDateChange] = useState();

    function handleClickOpen(e, action) {
        e.preventDefault();
        let obj = {};
        switch (action) {
            case "bin":
                obj = {
                    title: 'Create a New Bin',
                    disabled: false,
                    label1: 'Bin',
                };
                break;
            case "category":
                obj = {
                    title: 'Create New Category',
                    disabled: false,
                    label1: 'Category',
                };
                break;
            case "dept":
                obj = {
                    title: 'Create New Department',
                    disabled: false,
                    label1: 'Department',

                };
                break;
            case "uom":
                obj = {
                    title: 'Create Unit OF Measure',
                    disabled: false,
                    label1: 'UOM',

                };
                break;
        }
        setOpen(true);
        setAttribute(action);
        setDialogObj(obj)
    }

    function handleClose(event) {
        event.preventDefault()
        setOpen(false);
    }

    const handleSave = (event) => {
        event.preventDefault()
        let attributeReq = {};

        let newAttributes = [];
        switch (attribute) {
            case 'bin':
                attributeReq = {
                    attributeType: 'bins',
                    attributeValue: dialogObj['value']
                };
                setAttributes({...attributes,['bins']: ([...attributes['bins'] || [], dialogObj['value']])})
                break;
            case 'uom':
                attributeReq = {
                    attributeType: 'uom',
                    attributeValue: dialogObj['value']
                };
                setAttributes({...attributes, ['uom']: ([...attributes['uom'] || [], dialogObj['value']])})
                break;
            case 'category':
                attributeReq = {
                    attributeType: 'categories',
                    attributeValue: dialogObj['value']
                };
                setAttributes({...attributes, ['categories']: ([...attributes['categories'] || [], dialogObj['value']])})
                break;
            case 'department':
                attributeReq = {
                    attributeType: 'departments',
                    attributeValue: dialogObj['value']
                };
                setAttributes({...attributes, ['departments']: ([...attributes['departments'] || [], dialogObj['value']])})

                break;


        }
        addProduct(attributeUrl, attributeReq)
        setBasicInfo({...basicInfo, [attribute]: dialogObj['value']});
        setOpen(false);
    }

    function renderInputTextField(label, fieldName, required, validators) {
        if (required) {
            return <TextValidator
                component={'span'}
                required
                label={label}
                fullWidth
                onChange={event => handleChange(event, fieldName)}
                name={label}
                className={clsx(classes.textField, classes.dense)}
                value={basicInfo[fieldName]}
                validators={validators}
                errorMessages={['this field is required', 'Field is invalid']}
            />
        } else {
            return <TextField
                id="outlined-dense"
                label={label}
                fullWidth
                className={clsx(classes.textField, classes.dense)}
                value={basicInfo[fieldName]}
                onChange={event => handleChange(event, fieldName)}
            />
        }
    }

    const handleChange = (event, name) => {
        setBasicInfo({...basicInfo, [name]: event.target.value});
    };

    const setDate = (date) => {
        setBasicInfo({...basicInfo, ['expiryDate']: date});
    };

    const handleValueChange = (event, name) => {
        setDialogObj({...dialogObj, [name]: event.target.value})
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs>
                    {renderInputTextField('Barcode', 'barcode', true, ['required', 'matchRegexp:\[A-Za-z0-9\]'])}
                </Grid>
                <Grid item xs>
                    {renderInputTextField('SKU', 'sku', false)}
                </Grid>
                <Grid item xs>
                    {renderInputTextField('Product Name', 'productName', true, ['required'])}
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs>
                    {renderInputTextField('Product Description', 'description', false)}
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs>
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="uom">Unit Of Measure - {basicInfo.uom}</InputLabel>
                        <Select
                            name="uom"
                            value={basicInfo.uom || ''}
                            onChange={event => handleChange(event, 'uom')}
                            input={<Input id="uom"/>}
                        >
                            <MenuItem>
                                <Button variant="outlined" color="primary" onClick={e => handleClickOpen(e, "uom")}
                                        className={classes.button}>
                                    Add Unit of Measure
                                </Button></MenuItem>
                            {attributes.uom && attributes.uom.map((field, index) => {
                                return (
                                    <MenuItem key={index} value={field}>{field}</MenuItem>
                                )
                            })}
                        </Select>
                        {/*{hasError && <FormHelperText>This is required!</FormHelperText>}*/}
                    </FormControl>
                </Grid>
                <Grid item xs>
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="category">Category</InputLabel>
                        <Select
                            name="category"
                            value={basicInfo.category || ''}
                            onChange={event => handleChange(event, 'category')}
                            input={<Input id="category"/>}
                        >
                            <MenuItem value="">
                                <Button variant="outlined" color="primary" onClick={e => handleClickOpen(e, "category")}
                                        className={classes.button}>
                                    Add a Category
                                </Button>
                            </MenuItem>
                            {attributes.categories && attributes.categories.map((field, index) => {
                                return (
                                    <MenuItem key={index} value={field}>{field}</MenuItem>
                                )
                            })}
                        </Select>

                    </FormControl>
                </Grid>
                <Grid item xs>
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="department">Department</InputLabel>
                        <Select
                            name="department"
                            value={basicInfo.department || ''}
                            onChange={e => handleChange(e, 'department')}
                            input={<Input id="department"/>}
                        >
                            <MenuItem value="">
                                <Button variant="outlined" color="primary" onClick={e => handleClickOpen(e, "department")}
                                        className={classes.button}>
                                    Add a Department
                                </Button>
                            </MenuItem>
                            {attributes.departments && attributes.departments.map((field, index) => {
                                return (
                                    <MenuItem key={index} value={field}>{field}</MenuItem>
                                )
                            })}
                        </Select>

                    </FormControl>
                </Grid>

            </Grid>
            <Grid container spacing={2}>
                <Grid item xs>
                    {renderInputTextField('Retail Price', 'retailPrice', true, ['required', 'matchRegexp:^\\d*\\.?\\d+$'])}
                </Grid>
                <Grid item xs>
                    {renderInputTextField('Sale Price', 'salePrice', true, ['required', 'matchRegexp:^\\d*\\.?\\d+$'])}
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs>
                    {renderInputTextField('Stock', 'stock', true, ['required', 'matchRegexp:^(\\d+)$'])}
                </Grid>
                <Grid item xs={4}>
                    {renderInputTextField('Reorder Threshold', 'reOrderThreshold', false)}
                </Grid>

                <Grid item xs>
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="bin">Bin</InputLabel>
                        <Select
                            name="bin"
                            value={basicInfo.bin || ''}
                            onChange={e => handleChange(e, 'bin')}
                            input={<Input id="bin"/>}
                        >
                            <MenuItem>
                                <Button variant="outlined" color="primary" onClick={e => handleClickOpen(e, "bin")}
                                        className={classes.button}>
                                    Add a Bin
                                </Button></MenuItem>
                            {attributes.bins && attributes.bins.map((field, index) => {
                                return (
                                    <MenuItem key={index} value={field}>{field}</MenuItem>
                                )
                            })}
                        </Select>
                        {/*{hasError && <FormHelperText>This is required!</FormHelperText>}*/}
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={4} style={{padding: '18px'}}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            label="Expiry Date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            onAccept={setDate}
                            animateYearScrolling
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={4} style={{padding: '30px'}}>
                    {/*<TextField*/}
                    {/*    id="outlined-dense"*/}
                    {/*    label="Image Url"*/}
                    {/*    fullWidth*/}
                    {/*    className={clsx(classes.textField, classes.dense)}*/}
                    {/*    value={basicInfo.imgUrl}*/}
                    {/*    onChange={handleChange('imgUrl')}*/}
                    {/*/>*/}
                    <FormControl fullWidth className={classes.formControl}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="outlined-button-file"
                            multiple
                            type="file"
                        />
                        <label htmlFor="outlined-button-file">
                            <Button variant="outlined" color={"primary"} component="span" className={classes.button}>
                                Upload Image
                            </Button>
                        </label>
                    </FormControl>
                </Grid>
            </Grid>

            <div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{dialogObj.title}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            name={"value"}
                            id="available"
                            label={dialogObj.label1}
                            type="email"
                            disabled={dialogObj.availableDisabled}
                            fullWidth
                            value={dialogObj.value}
                            onChange={event => handleValueChange(event, 'value')}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={event => handleClose(event)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={event => handleSave(event)} color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

function addProduct(url, request) {
    post(url, request, (data) => {
        // toast.success('Saved SKU:' + skuId + ' Info Successfully')
    }, function (response) {

    })
}