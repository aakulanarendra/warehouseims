import React, {useEffect, useRef, useState} from 'react'
import './Store.css'
import {post} from "../../utils/client";
import {toast} from "react-toastify";
import clsx from 'clsx';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddToCartButton from "../addtocartbutton/AddToCartButton";
import FormDialog from "../shared/components/dialog/FormDialog";
import * as Constants from "../../utils/constants";

const url = "/customerlist";
const productsUrl = Constants.PRODUCTS_LIST_URL;
const orderurl = Constants.ORDERS_PLACE_URL;


const TAX_RATE = 0.07;

const ExpansionPanel = withStyles({
    root: {
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        borderTop: '1px solid rgba(0, 0, 0, .125)',
        borderLeft: 'none',
        borderRight: 'none',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
            borderLeft: '2px solid #4285f4'
        },
    },
    expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: '#fff',
        borderBottom: 'none',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiExpansionPanelDetails);


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
        backgroundColor: 'rgba(66,133,244,0.13)',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300
    },
    cardContent: {
        textAlign: 'center',
        padding: '10px 0px 0px',
        "&:last-child": {
            paddingBottom: 0
        }
    },
    margin: {
        margin: theme.spacing(2),
    },

    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {},
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        padding: '5px',
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.primary,
        align: 'justify',
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    group: {
        margin: theme.spacing(1, 0),
    },
    formControl: {
        margin: theme.spacing(3),
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
        flexGrow: 1,
        align: "center",
        alignItems: "flex-end",
        lineHeight: 'inherit'
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    paperColor: {
        backgroundColor: '#fff',
        marginBottom: '20px'
    },
    button: {
        margin: theme.spacing(1),
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
    green: {
        color: '#38b738'
    },
    storeContainer: {
        padding: theme.spacing(3),
        backgroundColor: '#e4e8ef',
        minHeight: '90vh'
    },
    searchBar: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        marginBottom: theme.spacing(2)
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
}));


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

function getSubtotal(cartProducts) {
    return cartProducts.map(({salePrice, quantity}) => salePrice * quantity).reduce((sum, i) => sum + i, 0);
}

function getTotalItems(cartProducts) {
    return cartProducts.map(({quantity}) => quantity).reduce((sum, i) => sum + i, 0);
}

function getThresholdAlert(product) {
    if (product.quantity >= product.available) {
        return <Typography variant="caption" display="block" color={"secondary"} gutterBottom>
            * Only {product.available} products available
        </Typography>;
    }
}

function getDiscountText(discount, total) {
    if (discount.type === 'percentage') {
        return `Appliied ${discount.value} % on total ${total} i.e., ${discount.value * total / 100}$`
    } else {
        return `Saved ${discount.value}$ on ${total}$`
    }
}


export default function Store(props) {
    const classes = useStyles();
    const [customer, setCustomer] = React.useState({customerId: '', customerName: ''});
    const [action, setAction] = React.useState();
    const [discount, setDiscount] = React.useState({type: '', value: 0});
    const [expanded, setExpanded] = React.useState('');
    const [dialogObj, setDialogObj] = React.useState({});
    const [searchParam, setSearchParam] = React.useState({});


    const [cartProducts, setCartProducts] = React.useState([]);
    const [subTotal, setSubTotal] = React.useState(0);
    const [orderTotal, setOrderTotal] = React.useState(0);
    const [products, setProducts, filteredProducts, setFilteredProducts] = useFetch(
        productsUrl
    );
    // const [filteredProducts, setFilteredProducts] = React.useState([]);

    const expansionPanelOpen = (newExpanded) => {
        setExpanded(expanded === newExpanded ? false : newExpanded);
    };
    const self = this;

    const [shipment, setShipment] = React.useState('pickUp');

    function handleChange(event) {
        setShipment(event.target.value);
    }

    useEffect(() => {
        setSubTotal(getSubtotal(cartProducts));
    }, [cartProducts])

    useEffect(() => {
        setFilteredProducts(products);
    }, []);

    // const searchBarRef = useRef(null);
    //
    // useEffect(() => {
    //     searchBarRef.current.focus();
    // }, []);

    const [open, setOpen] = React.useState(false);

    function handleClose() {
        setOpen(false);
    }


    function searchProduct(event) {
        let searchParamText = event.target.value.toLowerCase();
        setSearchParam(searchParamText);
        let filteredProds = products.filter(function (item) {
            return item.name.toLowerCase().search(searchParamText) !== -1 ||
                item.barcode.toLowerCase().search(searchParamText) !== -1 ||
                (item.desc || "").toLowerCase().search(searchParamText) !== -1;
        });
        setFilteredProducts(filteredProds);
    }

    function getDiscountValue(discount, total) {
        if (discount.type === 'percentage') {
            return `${discount.value * total / 100}$`
        } else {
            return `${discount.value}$`
        }
    }

    function getOrderTotal(subTotal, discount) {
        if (discount.type === 'percentage') {
            let discountValue = discount.value * subTotal / 100;
            return subTotal - discountValue;
        } else {
            return subTotal - discount.value;
        }
    }

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
                    action: action,
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
                    action: action,
                    data: rowData,
                    availableDisabled: true
                };
                break;

        }
        setOpen(true);
        setAction(action);
        setDialogObj(obj);
    };


    const placeOrderReq = () => {

        let products = [];
        cartProducts.forEach(product => {
            products.push({productId: product.barcode, quantity: product.quantity, price: product.salePrice})
        });
        let orderReq = {
            status: "New",
            customer: customer,
            shippingAmount: 0,
            shipmentType: shipment,
            discount: {
                offerType: discount.type,
                offerValue: discount.value,
                offerCode: discount.code
            },
            products: products
        };
        placeOrder(orderurl, orderReq, props)
    };

    const clearCustomer = () => {
        setCustomer({})
    };

    const clearDiscount = () => {
        setDiscount({value: 0})
    };

    const addTocart = product => {

        let available = product.available;
        let productMatched = cartProducts.find((cartPrd) => {
            return cartPrd.barcode === product.barcode;
        });

        let quantity = 1;
        if (productMatched) {
            let quantityVal = productMatched.quantity < product.available ? productMatched.quantity + 1 : productMatched.quantity;
            setCartProducts(cartProducts.map(item => item.barcode === product.barcode ? {
                ...item,
                'quantity': quantityVal
            } : item))
        } else {
            product = ({...product, ['quantity']: quantity});
            setCartProducts([...cartProducts, product]);
        }
    };

    const deleteFromCart = product => {
        let indexToRemove = cartProducts.indexOf(product);
        setCartProducts([...cartProducts.slice(0, indexToRemove), ...cartProducts.slice(indexToRemove + 1)]);
    };

    const addQuantity = (product) => {
        let quantity = product.quantity < product.available ? product.quantity + 1 : product.quantity;
        setCartProducts(cartProducts
            .map(item => item === product ? {...item, 'quantity': quantity} : item));
    };

    const removeQuantity = (product) => {
        if (product.quantity === 1) {
            let indexToRemove = cartProducts.indexOf(product);
            setCartProducts([...cartProducts.slice(0, indexToRemove), ...cartProducts.slice(indexToRemove + 1)]);
        } else {
            setCartProducts(cartProducts
                .map(item => item === product ? {...item, 'quantity': product.quantity - 1} : item));
        }
    };

    return (
        <Box className={classes.storeContainer}>
            <Grid container>
                <Grid item xs={8}>
                    <Grid row>
                        <Paper className={classes.searchBar}>
                            <IconButton className={classes.iconButton} aria-label="menu">
                                <MenuIcon/>
                            </IconButton>
                            <InputBase
                                className={classes.input}
                                placeholder="Search Product or scan a barcode"
                                inputProps={{'aria-label': 'Search a product'}}
                                onChange={searchProduct}
                                autoFocus={true}
                            />
                            <IconButton className={classes.iconButton} aria-label="search">
                                <SearchIcon/>
                            </IconButton>
                            {/*<Divider className={classes.divider} />*/}
                            {/*<IconButton color="primary" className={classes.iconButton} aria-label="directions">*/}
                            {/*    <DirectionsIcon />*/}
                            {/*</IconButton>*/}
                        </Paper>
                    </Grid>

                    {!filteredProducts.length &&
                    <Grid row>
                        <Paper className={classes.searchBar}>
                            <Typography>No Results found for searchParam, Clear text</Typography>
                            <IconButton className={classes.iconButton} aria-label="search">
                                <SearchIcon/>
                            </IconButton>
                        </Paper>
                    </Grid>
                    }

                    <Grid container spacing={3} xs={12} sm={12}>

                        {filteredProducts.map((product, index) => {
                            return <Grid item xs={3}>


                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.media}
                                        image={`/images/${index}.jpeg`}
                                        title="Paella dish"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography variant="body2" color="textPrimary" component="p">
                                            ${product.salePrice}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {product.name}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <Button size={"small"} fullWidth variant="outlined" color="primary"
                                                className={classes.button}
                                                onClick={() => addTocart(product)}>
                                            Add
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>;
                        })}
                    </Grid>

                </Grid>
                <Grid item xs={4}>

                    <React.Fragment>
                        <CssBaseline/>
                        <Box height="100%" fixed style={{
                            padding: '0px 20px',
                            height: '70vh',
                            maxHeight: '70vh',
                            overflow: 'auto'
                        }}>

                            <Box className={classes.paperColor} style={{textAlign: 'center'}}>
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
                            </Box>


                            <Box className={classes.paperColor}>
                                <List dense>
                                    <ListItem>
                                        <ListItemText primary="Items"/>
                                        <ListItemSecondaryAction>{getTotalItems(cartProducts)}</ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                                {cartProducts.map((product, index) => {
                                    return <ExpansionPanel square expanded={expanded === index}>
                                        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header"
                                                               expandIcon={<ExpandMoreIcon
                                                                   onClick={() => expansionPanelOpen(index)}/>}>

                                            <List dense style={{width: '100%'}}>
                                                {getThresholdAlert(product)}
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <StyledBadge badgeContent={product.quantity} color="primary">
                                                            <ShoppingCartIcon/>
                                                        </StyledBadge>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={product.name}
                                                        secondary={`${product.salePrice * product.quantity}$`}
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <IconButton onClick={() => deleteFromCart(product)} edge="end"
                                                                    aria-label="delete">
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            </List>

                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <AddToCartButton value={product.quantity} id={product.sku}
                                                             onClickCart={() => addQuantity(product)}
                                                             onRemoveCart={() => removeQuantity(product)}></AddToCartButton>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>;
                                })}
                            </Box>

                            <Box className={classes.paperColor}>

                                <FormControl component="fieldset" className={classes.formControl}>
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
                                </FormControl>
                            </Box>


                            <Box className={classes.paperColor}>
                                {discount.type ? <List dense style={{width: '100%'}}>
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
                                            className={classes.button} disabled={getTotalItems(cartProducts) === 0}>
                                        Add Discount
                                    </Button>
                                }
                                <Divider/>
                                <List dense>
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
                                        <ListItemSecondaryAction>0$</ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                            </Box>

                        </Box>
                        <Button disabled={getTotalItems(cartProducts) === 0} onClick={placeOrderReq} fullWidth
                                variant="contained" color="primary"
                                className={classes.button}>
                            Place Order {getOrderTotal(subTotal, discount)}$
                        </Button>


                    </React.Fragment>


                </Grid>
            </Grid>
            <FormDialog open={open} setOpen={setOpen}
                        setCustomer={setCustomer}
                        setDialogObj={setDialogObj}
                        handleClickOpen={handleClickOpen}
                        dialogObj={dialogObj}
                        setDiscount={setDiscount}
                        action={action}
            ></FormDialog>
        </Box>
    )
}

function placeOrder(url, request, props) {
    post(url, request, (data) => {
        props.history.push("/orders");
        toast.success('Placed Order Successfully')
    }, function (response) {

    })
}

export const useFetch = function (url) {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchUrl() {
        const response = await fetch(url);
        const json = await response.json();
        setProducts(json.productDetailList);
        setFilteredProducts(json.productDetailList);
        setLoading(false);
    }

    useEffect(() => {
        fetchUrl();
    }, []);
    return [products, setProducts, filteredProducts, setFilteredProducts];
};
