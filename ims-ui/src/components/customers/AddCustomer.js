import React from 'react';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Paper from "@material-ui/core/Paper";
import {toast} from "react-toastify";
import {post} from "../../utils/client";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import Toolbar from "@material-ui/core/Toolbar";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        formControl: {
            margin: theme.spacing(1),
        },
        root: {
            margin: theme.spacing(3),
            padding: theme.spacing(3, 2),
            boxShadow: '0 3px 5px 2px rgba(84, 81, 82, 0.3)'
        },
        button: {
            margin: theme.spacing(1),
            flexWrap: 'wrap',
        },
        input: {
            display: 'none',
        },
        title: {
            flexGrow: 1,
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        dense: {
            marginTop: theme.spacing(2),
        },
        menu: {
            width: 200,
        },
        leftIcon: {
            marginRight: theme.spacing(1),
        },
        rightIcon: {
            marginLeft: theme.spacing(1),
        },
        iconSmall: {
            fontSize: 20,
        },
    }),
);

export default function AddCustomer(props) {
    const classes = useStyles();

    const [customer, setCustomer] = React.useState({});
    const [address, setAddress] = React.useState({});

    const handleChange = name => event => {
        setCustomer({...customer, [name]: event.target.value});
    };

    const handleAddressChange = name => event => {
        setAddress({...address, [name]: event.target.value});
    };

    const handleSaveCustomer = (e) => {
        let updatedCustomer = {...customer,['addressList']:new Array(address)};
        setCustomer(updatedCustomer);
        saveCustomer("/customers", updatedCustomer, props);
    };

    return (
        <Grid container>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={6}>

                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Add New Customer
                    </Typography>
                    <Button variant="contained" component={Link} to="/customers" color="primary"
                            className={classes.button}>
                        <KeyboardArrowLeftIcon className={classes.rightIcon}/> Back to Customers
                    </Button>

                </Toolbar>

                <Paper className={classes.root}>
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="">First Name</InputLabel>
                        <Input name="firstName" value={customer.firstName} onChange={handleChange('firstName')}/>
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="">Last Name</InputLabel>
                        <Input name="lastName" value={customer.lastName} onChange={handleChange('lastName')}/>
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="">Phone</InputLabel>
                        <Input name="phone" value={customer.phone} onChange={handleChange('phone')}/>
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="">Rating</InputLabel>
                        <Input name="rating" value={customer.rating} onChange={handleChange('rating')}/>
                    </FormControl>

                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="">Address Line 1</InputLabel>
                        <Input name="addressLineOne" value={address.addressLineOne} onChange={handleAddressChange('addressLineOne')}/>
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="">Address Line 2</InputLabel>
                        <Input name="addressLineTwo" value={address.addressLineTwo} onChange={handleAddressChange('addressLineTwo')}/>
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="">City</InputLabel>
                        <Input name="city" value={address.city} onChange={handleAddressChange('city')}/>
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="">State</InputLabel>
                        <Input name="state" value={address.state} onChange={handleAddressChange('state')}/>
                    </FormControl>
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="">Country</InputLabel>
                        <Input name="country" value={address.country} onChange={handleAddressChange('country')}/>
                    </FormControl>
                    <div className={classes.formControl}>
                        <Button variant="contained" className={classes.button}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={e=>handleSaveCustomer(e)} color="primary" className={classes.button}>
                            Save
                        </Button>
                    </div>
                </Paper>
            </Grid>
        </Grid>

    );
}

function saveCustomer(url, request, props) {
    post(url, request, (data) => {
        props.history.push("/customers");
        toast.success('Saved Customer:' + request.firstName + ' Info Successfully')
    }, function (response) {

    })
}