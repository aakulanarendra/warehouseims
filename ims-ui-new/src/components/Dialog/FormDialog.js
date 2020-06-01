import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import makeStyles from "@material-ui/core/styles/makeStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import IntegrationAutosuggest from "../AutoSuggestion/AutoSuggestion";
import AddCustomer from "../../pages/customers/AddCustomer";
import { Add as AddIcon } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
    toggleContainer: {
        margin: theme.spacing(2, 0),
    },
}));


export default function FormDialog(props) {
    const {open, setOpen, handleClickOpen, dialogObj, setDialogObj, setCustomer, setDiscount, action} = props;

    const [alignment, setAlignment] = React.useState('amount');
    const [openAddCustomer, setOpenAddCustomer] = React.useState(false);
    const [selectCustomer, setSelectCustomer] = React.useState({});
    const [formats, setFormats] = React.useState(() => ['bold']);

    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
    };

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    function openAdd() {
        setOpenAddCustomer(true);
    }

    const classes = useStyles();

    const handleChange = (event, name) => {
        setDialogObj({...dialogObj, [name]: event.target.value});
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [suggestions, setSuggestions] = useFetch(
        "/api/customernames"
    );


    const updateData = (data) => {
        setSuggestions([...suggestions,data])
    };

    const handleSave = () => {
        if (action === 'customer') {
            setCustomer({customerName: selectCustomer.customerName, customerId: selectCustomer.customerId});
            setOpen(false);
        } else {
            setDiscount({type: alignment, value: dialogObj.data});
            setOpen(false);
        }
    };

    return (
        <div>
            <Dialog fullWidth
                    maxWidth="sm"
                    open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {dialogObj.title}
                    <>{dialogObj.action == 'customer' && <span> or add new customer
                    <IconButton color="primary" onClick={openAdd} aria-label="Add">
                       <AddIcon/>
                    </IconButton>
                        </span>
                    }</>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText/>

                    {dialogObj.action == 'discount' ?
                        <div>
                            <Grid container spacing={2}>
                                <Grid item sm={12} md={6}>
                                    <div className={classes.toggleContainer}>
                                        <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment}>
                                            <ToggleButton value="amount">
                                                <AttachMoneyIcon/>
                                            </ToggleButton>
                                            <ToggleButton value="percentage">
                                                %
                                            </ToggleButton>

                                        </ToggleButtonGroup>
                                    </div>
                                </Grid>
                            </Grid>
                            <FormControl fullWidth className={classes.margin}>
                                <InputLabel htmlFor="adornment-amount">Amount</InputLabel>
                                <Input
                                    id="adornment-amount"
                                    value={dialogObj.data}
                                    onChange={event => handleChange(event, 'data')}
                                    startAdornment={<InputAdornment
                                        position="start"> {alignment === 'amount' ? '$' : '%'} </InputAdornment>}
                                />
                            </FormControl>
                        </div>
                        :

                        <IntegrationAutosuggest setSelectCustomer={setSelectCustomer} inputSuggestions={suggestions}/>

                        // <TextField
                        //     autoFocus
                        //     margin="dense"
                        //     id="name"
                        //     label={dialogObj.label}
                        //     type="email"
                        //     fullWidth
                        //     disabled={dialogObj.disabled}
                        //     value={dialogObj.data}
                        //     onChange={event => handleChange(event, 'data')}
                        //
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {openAddCustomer &&
            <AddCustomer open={openAddCustomer} setOpen={setOpenAddCustomer} updateData={updateData}/>}
        </div>
    );
}

export const useFetch = function (url) {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchUrl() {
        const response = await fetch(url);
        const json = await response.json();
        setSuggestions(json);
        setLoading(false);
    }

    useEffect(() => {
        fetchUrl();
    }, []);
    return [suggestions, setSuggestions];
};
