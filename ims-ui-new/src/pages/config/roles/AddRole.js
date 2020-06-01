import React from 'react';
import {toast} from "react-toastify/index";
import Button from "@material-ui/core/Button/index";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import TextField from "@material-ui/core/TextField/index";
import Dialog from '@material-ui/core/Dialog/index';
import DialogActions from '@material-ui/core/DialogActions/index';
import DialogContent from '@material-ui/core/DialogContent/index';
import DialogTitle from '@material-ui/core/DialogTitle/index';
import useMediaQuery from '@material-ui/core/useMediaQuery/index';
import {useTheme} from '@material-ui/core/styles/index';
import {post} from "../../../utils/client";
import {ROLE_ADD} from "../../../utils/constants";


const addUrl = ROLE_ADD;


export default function AddRole(props) {

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
            updateData(data);
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
                value={inputReq[fieldName]||""}
                validators={validators}
                errorMessages={['this field is required', 'Field is invalid']}
            />
        } 
            return <TextField
                id="outlined-dense"
                label={label}
                fullWidth
                value={inputReq[fieldName]||""}
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
                <DialogTitle id="responsive-dialog-title">Add Role</DialogTitle>
                <DialogContent>
                    <ValidatorForm
                        ref={(r) => {
                            formref = r;
                        }}
                        onError={errors => console.log(errors)}
                        onSubmit={handleSave}
                    >
                        <div>
                            {renderInputTextField('Role', 'role', true, ['required'])}
                            {renderInputTextField('Role Description', 'roleDesc', true, ['required'])}
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

