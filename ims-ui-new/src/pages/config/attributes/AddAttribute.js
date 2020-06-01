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
import { SketchPicker } from 'react-color'
import * as Constants from "../../../utils/constants";
import {post} from "../../../utils/client";

import 'react-color-picker/index.css'


const addColourUrl = Constants.ATTRIBUTE_COLOUR_ADD;
const addSizeUrl = Constants.ATTRIBUTE_SIZE_ADD;


export default function AddAttribute(props) {

    const {open, setOpen, updateData,type} = props;
    const [inputReq, setInputReq] = React.useState({});
    const [colour,setColour] = React.useState({'hex':'red'});
    let formref = React.createRef();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    function setColourValue(colour) {
        setColour(colour)
    }

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }


    const handleChange = (event, name) => {
        setInputReq({...inputReq, [name]: event.target.value});
    };

    const handleSave = (event, errors) => {
        formref.isFormValid(false).then((isValid) => {
            if (isValid) {
                setOpen(false);
                let reqObj;
                let url;
                if(type === 'colour'){
                    reqObj = {
                        colourCode:colour.hex,
                            name:inputReq.name,
                        rgba: JSON.stringify(colour.rgb)
                    };
                    url = addColourUrl;
                }else{
                    reqObj = inputReq;
                    url = addSizeUrl;
                }

                save(url, reqObj, props);
            }
        });
    };

    function save(url, request, props) {
        post(url, request, (data) => {
            toast.success(`Saved :${  request.name  } Info Successfully`)
            updateData(request);
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
                <DialogTitle id="responsive-dialog-title">{type === 'colour' ? "Add Colour" : "Add Size"}</DialogTitle>
                <DialogContent>
                    <ValidatorForm
                        ref={(r) => {
                            formref = r;
                        }}
                        onError={errors => console.log(errors)}
                        onSubmit={handleSave}
                    >
                        {type === 'colour' ?
                            <div>
                                {renderInputTextField('Colour Name', 'name', true, ['required'])}
                                <SketchPicker color={colour} onChange={setColourValue}/>
                            </div>
                            :
                            <div>
                                {renderInputTextField('Size Name', 'name', true, ['required'])}
                                {renderInputTextField('Size Code', 'sizeCode', true, ['required'])}
                            </div>
                        }
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

