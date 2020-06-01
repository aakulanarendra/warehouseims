import React, {useEffect} from 'react';
import {toast} from "react-toastify";
import Button from "@material-ui/core/Button";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import TextField from "@material-ui/core/TextField";
import clsx from 'clsx';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {SingleSelect} from "react-select-material-ui";
import {Styles} from "./Style";
import * as Constants from "../../utils/constants";
import {post,get} from "../../utils/client";


const addUrl = "/api/customers";
const userRoles = "/api/roles";


export default function AddCustomer(props) {
    const classes = Styles();
    const {open, setOpen,updateData} = props;
    let formref = React.createRef();
    const [customer, setCustomer] = React.useState({});
    const [address, setAddress] = React.useState({});
    const [roles,setRoles] = React.useState({});

    function handleClose() {
        setOpen(false);
    }

    const handleChange = (event,name) => {
        setCustomer({...customer, [name]: event.target.value});
    };

    const handleRoleChange = (value) => {
        setCustomer({...customer, 'roles': value});
    };

    const handleAddressChange = (event,name) => {
        setAddress({...address, [name]: event.target.value});
    };

    useEffect(() => {
        get(userRoles, (data) => {
            const dataVal = data.map(role => ({value:role.id,label:role.role}))
            setRoles(dataVal)
        }, function (response) {

        })

    }, []);

    const handleSaveCustomer = (event, errors) => {
        formref.isFormValid(false).then((isValid) => {
            if (isValid) {
                setOpen(false);
                const updatedCustomer = {...customer,'addressList':new Array(address)};
                setCustomer(updatedCustomer);
                saveCustomer(addUrl,updatedCustomer, props);
            }
        });
    };

    function saveCustomer(url, request, props) {
        post(url, request, (data) => {
            toast.success('Saved Customer Successfully')
            updateData(data);
        }, function (response) {

        })
    }

    function renderInputTextField(label, fieldName, required, validators) {
        if (required) {
            return <TextValidator
                component="span"
                required
                label={label}
                fullWidth
                onChange={event => handleChange(event, fieldName)}
                name={label}
                className={clsx(classes.textField, classes.dense)}
                value={customer[fieldName] || ""}
                validators={validators}
                errorMessages={['this field is required', 'Field is invalid']}
            />
        } 
            return <TextField
                id="outlined-dense"
                label={label}
                fullWidth
                className={clsx(classes.textField, classes.dense)}
                value={customer[fieldName]||""}
                onChange={event => handleChange(event, fieldName)}
            />
        
    }

    function renderAddressTextField(label, fieldName, required, validators) {
        if (required) {
            return <TextValidator
                component="span"
                required
                label={label}
                fullWidth
                onChange={event => handleAddressChange(event, fieldName)}
                name={label}
                className={clsx(classes.textField, classes.dense)}
                value={address[fieldName] || ""}
                validators={validators}
                errorMessages={['this field is required', 'Field is invalid']}
            />
        } 
            return <TextField
                id="outlined-dense"
                label={label}
                fullWidth
                className={clsx(classes.textField, classes.dense)}
                value={address[fieldName] || ""}
                onChange={event => handleAddressChange(event, fieldName)}
            />
        
    }


    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                scroll="body"
            >
                <DialogTitle id="responsive-dialog-title">Add Customer</DialogTitle>
                <DialogContent>
                    <ValidatorForm
                        ref={(r) => {
                            formref = r;
                        }}
                        onError={errors => console.log(errors)}
                        onSubmit={handleSaveCustomer}
                    >
                        <div>
                            {renderInputTextField('First Name', 'firstName', true, ['required'])}
                            {renderInputTextField('Last Name', 'lastName', true, ['required', 'matchRegexp:[A-Za-z0-9]'])}
                            {renderInputTextField('User Name', 'userName', true, ['required', 'matchRegexp:[A-Za-z0-9]'])}
                            {renderInputTextField('Password', 'password', true, ['required', 'matchRegexp:[A-Za-z0-9]'])}
                            {renderInputTextField('Phone', 'phone', true, ['required', 'matchRegexp:[A-Za-z0-9]'])}
                            {renderInputTextField('Rating', 'rating', true, ['required', 'matchRegexp:[0-9]'])}
                            {renderAddressTextField('AddressLine 1', 'addressLineOne', true, ['required', 'matchRegexp:[A-Za-z0-9]'])}
                            {renderAddressTextField('AddressLine 2', 'addressLineTwo', false, [])}
                            {renderAddressTextField('City', 'city', true, ['required', 'matchRegexp:[A-Za-z0-9]'])}
                            {renderAddressTextField('State', 'state', true, ['required', 'matchRegexp:[A-Za-z0-9]'])}
                            {renderAddressTextField('Country', 'country', true, ['required', 'matchRegexp:[A-Za-z0-9]'])}
                            <SingleSelect value="user" placeholder="Select a role" options={roles} onChange={handleRoleChange} />
                        </div>
                    </ValidatorForm>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveCustomer} color="primary" autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}