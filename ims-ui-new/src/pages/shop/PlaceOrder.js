import React, { useEffect, useRef } from 'react'
import Paper from "@material-ui/core/Paper/index";
import Button from "@material-ui/core/Button/index";
import FormControl from "@material-ui/core/FormControl/index";
import FormLabel from "@material-ui/core/FormLabel/index";
import RadioGroup from "@material-ui/core/RadioGroup/index";
import FormControlLabel from "@material-ui/core/FormControlLabel/index";
import Radio from "@material-ui/core/Radio/index";
import List from "@material-ui/core/List/index";
import ListItem from "@material-ui/core/ListItem/index";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/index";
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ListItemText from "@material-ui/core/ListItemText/index";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/index";
import IconButton from "@material-ui/core/IconButton/index";
import withStyles from "@material-ui/core/styles/withStyles";
import clsx from 'clsx';
import Badge from "@material-ui/core/Badge/Badge";
import { AccountCircle as AccountCircleIcon, Clear as ClearIcon, PersonAdd as PersonAddIcon } from "@material-ui/icons/index";
import Grid from "@material-ui/core/Grid/index";
import { toast } from "react-toastify/index";
import { withRouter } from "react-router-dom";
import SearchBar from "material-ui-search-bar/lib/index";
import Icon from "@material-ui/core/Icon/index";
import { useSnackbar } from "notistack/build/index";
import { sortBy } from "lodash";
import { useCartDispatch, useCartState } from "../../context/CartContext";
import FormDialog from "../../components/Dialog/FormDialog";
import { post } from "../../utils/client";
import { Typography } from "../../components/Wrappers";
import { browseStyles } from "./BrowseProductStyle";
import * as Constants from "../../utils/constants";
import AddCustomer from "../customers/AddCustomer";

const orderurl = Constants.ORDERS_PLACE_URL;

function getSubtotal(cartProducts) {
    return cartProducts.map(({salePrice, quantity}) => salePrice * quantity).reduce((sum, i) => sum + i, 0);
}

function getTotalItems(cartProducts) {
    return cartProducts.map(({quantity}) => quantity).reduce((sum, i) => sum + i, 0);
}

function getThresholdAlert(product) {
    if (product.quantity >= product.available) {
        return <Typography variant="caption" display="block" color="secondary" gutterBottom>
            * Only {product.available} products available
        </Typography>;
    }
}

const StyledBadge = withStyles(theme => ({
    badge: {
        top: '50%',
        right: -3,
        // The border color match the background color.
        border: `2px solid ${
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
            }`,
    },
}))(Badge);


function getDiscountText(discount, total) {
    if (discount.type === 'percentage') {
        return `Appliied ${discount.value} % on total ${total} i.e., ${discount.value * total / 100}$`
    }
    return `Saved ${discount.value}$ on ${total}$`

}

function getDiscountValue(discount, total) {
    if (discount.type === 'percentage') {
        return `${discount.value * total / 100}$`
    }
    return `${discount.value}$`

}

function getTaxValue(cartProducts) {
    return  cartProducts.map(({salePrice, quantity,tax}) => tax/100*salePrice * quantity).reduce((sum, i) => sum + i, 0);
}

function formatMoney(number) {
    return (number||0).toLocaleString('en-US', {style: 'currency', currency: 'USD'});
}

function getOrderTotal(subTotal, discount,tax) {
    if (discount.type === 'percentage') {
        const discountValue = discount.value * subTotal / 100;
        return subTotal - discountValue;
    }
    return subTotal - discount.value + tax;

}


function CartDetails(props) {
    const classes = browseStyles();


    const {items} = useCartState();

    const [inputQuantity, setInputQuantity] = React.useState(false);
    const [customer, setCustomer] = React.useState({customerId: '', customerName: ''});
    const [action, setAction] = React.useState();
    const [discount, setDiscount] = React.useState({type: '', value: 0});
    const [expanded, setExpanded] = React.useState('');
    const [dialogObj, setDialogObj] = React.useState({});
    const [searchParam, setSearchParam] = React.useState("");
    const searchBarRef = useRef(null);
    const [subTotal, setSubTotal] = React.useState(0);
    const [orderTotal, setOrderTotal] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const cartDispatch = useCartDispatch()
    function handleClose() {
        setOpen(false);
    }

    const placeOrderReq = () => {
        const products = [];
        items.forEach(product => {
            products.push({productId: product.barcode, quantity: product.quantity, price: product.salePrice,tax:product.tax})
        });
        const orderReq = {
            status: "New",
            customer,
            shippingAmount: 0,
            shipmentType: shipment,
            discount: {
                offerType: discount.type,
                offerValue: discount.value,
                offerCode: discount.code
            },
            products
        };
        placeOrder(orderurl, orderReq, props,enqueueSnackbar,cartDispatch)
    };

    const handleClickOpen = (e, rowData, action) => {
        e.preventDefault();
        let obj = {};
        switch (action) {
            case "customer":
                obj = {
                    title: 'Select Customer',
                    available: rowData.stock,
                    disabled: false,
                    label1: 'customer',
                    label2: 'Quantity',
                    data: rowData,
                    action,
                    availableDisabled: true
                };
                break;
            case "discount":
                obj = {
                    title: 'Add Discount',
                    available: rowData.stock,
                    disabled: false,
                    label1: 'discount',
                    label2: 'Quantity',
                    action,
                    data: rowData,
                    availableDisabled: true
                };
                break;

        }
        setOpen(true);
        setAction(action);
        setDialogObj(obj);
    };

    // const [filteredProducts, setFilteredProducts] = React.useState([]);

    const expansionPanelOpen = (newExpanded) => {
        setExpanded(expanded === newExpanded ? false : newExpanded);
    };
    const self = this;

    const clearCustomer = () => {
        setCustomer({})
    };

    const clearDiscount = () => {
        setDiscount({value: 0})
    };

    const clearSearch = () => {
        setSearchParam("")
        searchBarRef.current.value = "";
    };

    const [shipment, setShipment] = React.useState('pickUp');

    function handleChange(event) {
        setShipment(event.target.value);
    }


    const updateData = (data) => {

    };

    useEffect(() => {
        setSubTotal(getSubtotal(items));
    }, [items])

    return (

        <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Paper className={classes.paper}>

                        {customer.customerId ? <List dense style={{width: '100%'}}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <StyledBadge color="primary">
                                            <AccountCircleIcon color="primary"/>
                                        </StyledBadge>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={customer.customerName}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton onClick={() => clearCustomer()} edge="end" aria-label="delete">
                                            <ClearIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                            :
                            <Button onClick={e => handleClickOpen(e, "", "customer")} color="primary"
                                    className={classes.button}>
                                <PersonAddIcon className={clsx(classes.leftIcon, classes.iconSmall)}/>
                                Select Customer
                            </Button>}
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Paper className={classes.paper}> <FormControl style={{width: '100%'}} component="fieldset"
                                                                   className={classes.formControl}>
                        <FormLabel component="legend">Shipment Type</FormLabel>
                        <RadioGroup
                            aria-label="pickUp"
                            name="shipment"
                            className={classes.group}
                            value={shipment}
                            onChange={handleChange}
                            row
                        >
                            <FormControlLabel
                                value="pickUp"
                                control={<Radio color="primary"/>}
                                label="Pick Up"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="shipment"
                                control={<Radio color="primary"/>}
                                label="Shipment"
                                labelPlacement="end"
                            />
                        </RadioGroup>
                    </FormControl></Paper>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Paper className={classes.paper}>  {discount.type ? <List dense style={{width: '100%'}}>
                            <ListItem>
                                <ListItemAvatar>
                                    <StyledBadge color="primary">
                                        <LocalOfferIcon className={classes.green}/>
                                    </StyledBadge>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={getDiscountText(discount, subTotal)}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton onClick={() => clearDiscount()} edge="end" aria-label="delete">
                                        <ClearIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                        :
                        <Button onClick={e => handleClickOpen(e, "", "discount")} color="primary"
                                className={classes.button} disabled={getTotalItems(items) === 0}>
                            Add Discount
                        </Button>
                    }</Paper>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Paper className={classes.paper}> <List dense>
                        <ListItem>
                            <ListItemText primary="Sub Total"/>
                            <ListItemSecondaryAction>{subTotal}$</ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Discount"/>
                            <ListItemSecondaryAction>{getDiscountValue(discount, subTotal)}</ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Tax"/>
                            <ListItemSecondaryAction>{formatMoney(getTaxValue(items))}</ListItemSecondaryAction>
                        </ListItem>
                    </List></Paper>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Button disabled={getTotalItems(items) === 0} onClick={placeOrderReq}
                            fullWidth
                            variant="contained" color="primary"
                            className={classes.button}>
                        Place Order {getOrderTotal(subTotal, discount,getTaxValue(items))}$
                    </Button>
                </Grid>
                <FormDialog open={open} setOpen={setOpen}
                            setCustomer={setCustomer}
                            setDialogObj={setDialogObj}
                            handleClickOpen={handleClickOpen}
                            dialogObj={dialogObj}
                            setDiscount={setDiscount}
                            action={action}
                />

        </Grid>


    )
}


function placeOrder(url, request, props,enqueueSnackbar,cartDispatch) {
    post(url, request, (data) => {
        cartDispatch({
            type: "REMOVE_ALL"
        });
        enqueueSnackbar(`Placed Order Successfully`,{
            variant: 'success'
        })
        props.history.push(`/app/order/confirm/${data.orderId}`);
    }, function (response) {

    })
}


export default withRouter(CartDetails);