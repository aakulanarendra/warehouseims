import React from 'react';
import {toast} from "react-toastify";
import Button from "@material-ui/core/Button";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import TextField from "@material-ui/core/TextField";
import clsx from 'clsx';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl";
import {DropzoneArea} from "material-ui-dropzone";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import {categoryStyles} from "./CategoryStyle";
import * as Constants from "../../../utils/constants";
import {handleImageUpload, post} from "../../../utils/client";


const addCategoryUrl = Constants.CATEGORY_ADD;


export default function AddCategory(props) {
    const classes = categoryStyles();
    const {open, setOpen, updateData} = props;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    const [category, setCategory] = React.useState({});
    let formref = React.createRef();

    const handleChange = (event, name) => {
        setCategory({...category, [name]: event.target.value});
    };


    const handleFileChange = (files) => {
        setCategory({...category, "files": files});
    }

    const handleSaveCategory = (event, errors) => {
        formref.isFormValid(false).then((isValid) => {
            if (isValid) {
                setOpen(false);
                saveCategory(addCategoryUrl, category, props);
            }
        });
    };

    function saveCategory(url, request, props) {
        request.searchTerms = request.searchTerms||"".split(",");
        handleImageUpload(category.files,(data) => {
            const imageIds = data.map((img) => `${img.public_id}.${img.format}`);
            request.imageUrls = imageIds;
            saveCatalog(request)
        }, function (error) {
            saveCatalog(request)
        });
    }

    function saveCatalog(request) {
        post(addCategoryUrl, request, (data) => {
            toast.success(`Saved Category:${  request.categoryName  } Info Successfully`)
            updateData(data);
        }, function (response) {

        })
    }

    function renderInputTextField(label, fieldName, required, validators) {
        if (required) {
            return <TextValidator
                component="span"
                required
                margin="dense"
                variant="outlined"
                label={label}
                fullWidth
                onChange={event => handleChange(event, fieldName)}
                name={label}
                className={clsx(classes.textField, classes.dense)}
                value={category[fieldName] || ""}
                validators={validators}
                errorMessages={['this field is required', 'Field is invalid']}
            />
        } 
            return <TextField
                id="outlined-dense"
                margin="dense"
                variant="outlined"
                label={label}
                fullWidth
                className={clsx(classes.textField, classes.dense)}
                value={category[fieldName] || ""}
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
                <DialogTitle id="responsive-dialog-title">Add Category</DialogTitle>
                <DialogContent>
                    <ValidatorForm
                        ref={(r) => {
                            formref = r;
                        }}
                        onError={errors => console.log(errors)}
                        onSubmit={handleSaveCategory}
                    >
                        <div>
                            {renderInputTextField('Category Name', 'categoryName', true, ['required', 'matchRegexp:[A-Za-z0-9]'])}
                            {renderInputTextField('Category Description', 'description', true, ['required', 'matchRegexp:[A-Za-z0-9]'])}
                            <TextValidator
                                component="span"
                                margin="dense"
                                variant="outlined"
                                label="Category Level Tax"
                                fullWidth
                                onChange={event => handleChange(event, "tax")}
                                name="Tax"
                                className={clsx(classes.textField, classes.dense)}
                                value={category.tax}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                }}
                            />
                            {renderInputTextField('Search Terms', 'searchTerms', false, ['matchRegexp:[A-Za-z0-9]'])}
                            <FormControl fullWidth className={classes.formControl}>
                                <input
                                    accept="image/*"
                                    style={{display:"none"}}
                                    id="outlined-button-file"
                                    multiple
                                    type="file"
                                />
                                <DropzoneArea  onChange={handleFileChange}/>
                            </FormControl>
                        </div>
                    </ValidatorForm>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveCategory} color="primary" autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

