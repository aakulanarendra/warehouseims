import React from 'react';
import {toast} from "react-toastify";
import Button from "@material-ui/core/Button";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import TextField from "@material-ui/core/TextField";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import * as Constants from "../../../utils/constants";
import {post} from "../../../utils/client";


const addUrl = Constants.STORE_ADD;


export default function AddStore(props) {

    const {open, setOpen,updateData} = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    const [inputReq, setInputReq] = React.useState({});
    let formref = React.createRef();

    const handleChange = (event, name) => {
        setInputReq({...inputReq, [name]: event.target.value});
    };

    const handleSave = (event, errors) => {
        formref.isFormValid(false).then((isValid) => {
            if (isValid) {
                setOpen(false);
                save(addUrl, inputReq, props);
            }
        });
    };

    function save(url, request, props) {
        post(url, request, (data) => {
            toast.success(`Saved :${  request.name  } Info Successfully`)
            updateData(inputReq);
        }, function (response) {

        })
    }

    const handleCancel = (event) => {
        props.history.push("/app/config/brand");
    };

    function renderInputTextField(label, fieldName, required, validators) {
        if (required) {
            return <TextValidator
                component="span"
                required
                label={label}
                fullWidth
                onChange={event => handleChange(event, fieldName)}
                name={label}
                value={inputReq[fieldName]}
                validators={validators}
                errorMessages={['this field is required', 'Field is invalid']}
            />
        } 
            return <TextField
                id="outlined-dense"
                label={label}
                fullWidth
                value={inputReq[fieldName]}
                onChange={event => handleChange(event, fieldName)}
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
                <DialogTitle id="responsive-dialog-title">Add Department</DialogTitle>
                <DialogContent>
                    <ValidatorForm
                        ref={(r) => {
                            formref = r;
                        }}
                        onError={errors => console.log(errors)}
                        onSubmit={handleSave}
                    >
                        <div>
                            {renderInputTextField('Code', 'code', true, ['required'])}
                            {renderInputTextField('Name', 'name', true, ['required'])}
                            {renderInputTextField('Address', 'address', true, ['required'])}
                            {renderInputTextField('Zip Code', 'zipCode', true, ['required'])}
                            {renderInputTextField('Phone Number', 'phoneNumber', true, ['required'])}
                            {renderInputTextField('City', 'city', true, ['required'])}
                            {renderInputTextField('State', 'state', true, ['required', 'matchRegexp:\[A-Za-z0-9\]'])}
                            {renderInputTextField('Country', 'country', true, ['required', 'matchRegexp:\[A-Za-z0-9\]'])}
                            {renderInputTextField('currency', 'currency', true, ['required', 'matchRegexp:\[A-Za-z0-9\]'])}
                        </div>
                    </ValidatorForm>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary" autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

