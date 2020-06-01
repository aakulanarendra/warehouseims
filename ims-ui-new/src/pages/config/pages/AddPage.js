import React, {useState} from 'react';
import {toast} from "react-toastify";
import Button from "@material-ui/core/Button";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import TextField from "@material-ui/core/TextField";
import {useTheme} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import * as Constants from "../../../utils/constants";
import {post} from "../../../utils/client";
import {Typography} from "../../../components/Wrappers";
import useStyles from "./styles";


const addUrl = Constants.PAGES_ADD;


export default function AddPage(props) {

    const {updateData} = props;
    const theme = useTheme();
    const classes = useStyles();
    let formref = React.createRef();

    const [inputReq, setInputReq] = useState({type: 'page'});


    const handleChange = (event, name) => {
        setInputReq({...inputReq, [name]: event.target.value});
    };

    const [fields, setFields] = useState([{label: null, link: null}]);

    function handleChildrenChange(event, name, i) {
        const values = [...fields];
        values[i] = {...values[i], [name]: event.target.value}
        setFields(values);
    }

    function handleAdd() {
        const values = [...fields];
        values.push({label: null, link: null});
        setFields(values);
    }

    function savePage() {
        const valFields = fields.filter(function (page) {
            if (page.label && page.link) { return page; }
        });

        formref.isFormValid(false).then((isValid) => {
            if (isValid) {

                const req = {...inputReq, 'childPages': fields};
                post(addUrl, req, (data) => {

                    toast.success('Saved Info Successfully')
                    setFields([{label: null, link: null}]);
                    updateData(req);
                    setInputReq({type: 'page'});
                }, function (response) {

                })
            }
        });


    }

    function handleRemove(i) {
        const values = [...fields];
        values.splice(i, 1);
        setFields(values);
    }

    function renderInputTextField(label, grid, fieldName, required, validators) {
        if (required) {
            return <Grid item xs={grid}>
                <TextValidator
                    component="span"
                    required
                    label={label}
                    fullWidth
                    onChange={event => handleChange(event, fieldName)}
                    name={label}
                    value={inputReq[fieldName] ||""}
                    validators={validators}
                    errorMessages={['this field is required', 'Field is invalid']}
                />
            </Grid>
        } 
            return <Grid item xs={grid}>
                <TextField
                    id="outlined-dense"
                    label={label}
                    fullWidth
                    value={inputReq[fieldName]||""}
                    onChange={event => handleChange(event, fieldName)}
                />
            </Grid>
        
    }


    return (
        <div>
            <ValidatorForm
                ref={(r) => {
                    formref = r;
                }}
                onError={errors => console.log(errors)}
                onSubmit={savePage}
            >
                <div>
                    <Grid container spacing={4}>

                        <Grid item xs={3}>
                            <Typography weight="bold" variant="h5" >
                                Pages
                            </Typography>
                        </Grid>

                        <Grid item xs={3}>
                            <Button variant="outlined" color="primary" size="small" onClick={() => savePage()}>
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        {renderInputTextField('Label', 3, 'label', true, ['required'])}
                        {renderInputTextField('link', 3, 'link', true, ['required'])}
                        {renderInputTextField('icon', 3, 'icon', true, ['required'])}
                        < Grid item xs={3}>
                            <FormControl disabled fullWidth>
                                <InputLabel htmlFor="status">Status</InputLabel>
                                <Select
                                    value={inputReq.type}
                                    onChange={event => handleChange(event, "type")}
                                    inputProps={{
                                        name: 'status',
                                        id: 'status',
                                    }}
                                >
                                    <MenuItem value="page">Page</MenuItem>
                                    <MenuItem value="divider">Divider</MenuItem>
                                    <MenuItem value="title">Title</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Typography weight="bold" variant="h5" className={classes.text}>
                        Children
                    </Typography>


                    <Button variant="outlined" color="primary" size="small" onClick={() => handleAdd()}>
                        + Add child page
                    </Button>

                    {fields.map((field, idx) => {
                        return (
                            <Grid key={field} container spacing={4}>

                                <Grid item xs={3}>
                                    <TextValidator
                                        component="span"
                                        label="Label"
                                        fullWidth
                                        onChange={event => handleChildrenChange(event, "label", idx)}
                                        name="Label"
                                        value={field.label || ""}
                                    />
                                </Grid>

                                <Grid item xs={3}>
                                    <TextValidator
                                        component="span"
                                        label="Link"
                                        fullWidth
                                        onChange={event => handleChildrenChange(event, "link", idx)}
                                        name="Link"
                                        value={field.link ||""}

                                    />
                                </Grid>


                                <Grid item xs={3}>
                                    <Button variant="outlined" type="button" onClick={() => handleRemove(idx)}>
                                        X
                                    </Button>
                                </Grid>
                            </Grid>


                        );
                    })}


                    {/* {renderInputTextField('children',3, 'children', true, ['required'])} */}
                </div>
            </ValidatorForm>
        </div>
    );
}

