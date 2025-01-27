import React, {useEffect, useState} from 'react'
import './Orders.css'
import MaterialTable from "material-table";
import {get, post} from "../../utils/client";
import {toast} from "react-toastify";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import {makeStyles} from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import {
    ErrorThemeProvider, OrangeThemeProvider,
    ProgressThemeProvider,
    SuccessThemeProvider,
    WarningThemeProvider
} from "../../theme/muiTheme";
import DoneIcon from '@material-ui/icons/Done';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import BlockIcon from '@material-ui/icons/Block';
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Moment from "react-moment";
import * as Constants from "../../utils/constants";
import moment from "moment";

const url = Constants.ORDERS_LIST_URL;
const updateUrl = Constants.ORDERS_STATUS_URL;
const TAX_RATE = 0.07;


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },
    table: {
        padding: "0 30px",
        paper: {
            boxShadow: '0',
            background: '#18202c'
        }
    },
    statusWidth: {
        minWidth: '100px'
    },
    orderOverview: {
        backgroundColor: 'rgba(133,175,255,0.17)',
        padding: '20px',
        minHeight: '100vh',
        borderLeft: '1px solid lightgrey'
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
    MuiTypographyBody2: {
        fontSize: '2.875rem',
        fontFamily: "Roboto,Helvetica,Arial,sans-serif",
        fontWeight: 400,
        lineHeight: 1.43,
        letterSpacing: '0.01071em'
    },
    listItemText: {
        fontSize: '2.1em',
    },
    primaryListItem: {
        fontSize: '0.85em',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    orderContainer: {
        padding: theme.spacing(3),
    }

}));

const pickUpOrderStatus = ["Pending", "Ready For PickUp", "PickedUp", "Completed", "Cancelled"];

const shipOrderStatus = ["Pending", "Packing Started", "Ready For Shipping", "Shipped", "Cancelled", "Completed"];

function ccyFormat(num) {
    return (num || 0).toFixed(2);
}

function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return {desc, qty, unit, price};
}

function getDiscountAmount(discount, total) {
    if (discount.offerType === 'percentage') {
        return Number(discount.offerValue * total / 100);
    } else {
        return Number(discount.offerValue);
    }
}

function isOrderToday(created) {
    return (moment().format('L') === moment(created).format('L'))
}

function getOrdersByStatus(orders, status) {
    if (status === "today") {
        return orders.reduce((total, order) => (isOrderToday(order.created) ? total + 1 : total), 0)
    } else {
        return orders.reduce((total, order) => (order.status === status ? total + 1 : total), 0)
    }
}

function getStatusChip(rowData, handleClick) {
    switch (rowData.status) {
        case 'New':
            return <Chip onClick={e => handleClick(e, rowData)} style={{minWidth: '100px'}}
                         variant="outlined" label={rowData.status}
                         color="primary" size="small"
                         icon={<MoreHorizIcon/>}/>

        case 'Ready For PickUp':
        case 'Ready For Shipping':
            return <WarningThemeProvider><Chip onClick={e => handleClick(e, rowData)} style={{minWidth: '100px'}}
                                               variant="outlined" label={rowData.status}
                                               color="primary" size="small"
                                               icon={<MoreHorizIcon/>}/></WarningThemeProvider>;
        case 'Shipped':
        case 'PickedUp':
            return <ProgressThemeProvider><Chip onClick={e => handleClick(e, rowData)} style={{minWidth: '100px'}}
                                                variant="outlined" label={rowData.status}
                                                color="primary" size="small"
                                                icon={<MoreHorizIcon/>}/></ProgressThemeProvider>;
        case 'Pending':
        case 'Packing Started':
            return <OrangeThemeProvider><Chip onClick={e => handleClick(e, rowData)} style={{minWidth: '100px'}}
                                              variant="outlined" label={rowData.status}
                                              color="primary" size="small"
                                              icon={<MoreHorizIcon/>}/></OrangeThemeProvider>;
        case 'Cancelled':
            return <ErrorThemeProvider><Chip disabled={true} style={{minWidth: '100px'}}
                                             variant="outlined" label={rowData.status}
                                             color="primary" size="small"
                                             icon={<BlockIcon/>}/></ErrorThemeProvider>;
        case 'Completed':
            return <SuccessThemeProvider><Chip disabled={true} style={{minWidth: '100px'}}
                                               variant="outlined" label={rowData.status}
                                               color="primary" size="small"
                                               icon={<DoneIcon/>}/></SuccessThemeProvider>;
        default:
            return <SuccessThemeProvider><Chip onClick={e => handleClick(e, rowData)} style={{minWidth: '100px'}}
                                               variant="outlined" label={rowData.status}
                                               color="primary" size="small"
                                               icon={<DoneIcon/>}/></SuccessThemeProvider>;

    }

}

function subtotal(items) {
    return items.map(({price}) => price).reduce((sum, i) => sum + i, 0);
}

function orderStatusMap(shipType, status) {
    let orderStatus = [];
    if (shipType === 'shipment') {
        orderStatus = pickUpOrderStatus;
    } else {
        orderStatus = shipOrderStatus;
    }

    let index = orderStatus.indexOf(status);
    if (index > 0) {
        orderStatus.splice(index, 1);
        orderStatus.unshift(status);
    }
    return orderStatus;
}


// const invoiceSubtotal = subtotal(rows);
// const invoiceTaxes = TAX_RATE * invoiceSubtotal;
// const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function Orders() {

    const classes = useStyles();
    const handleChange = (event, name) => {
        setNewStatus(event.target.value);
    };

    const [open, setOpen] = React.useState(false);
    const [status, setstatus] = React.useState();
    const [newStatus, setNewStatus] = React.useState();
    const [clickedData, setClickedData] = React.useState({});

    const [ordersData, loading] = useFetch(url);

    function handleClickOpen(e, rowData) {
        setOpen(true);
        setClickedData(rowData);
        setstatus(rowData.status);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleUpdate() {
        const index = ordersData.indexOf(clickedData);
        if (ordersData[index]['status'] === newStatus) {
            return;
        }
        ordersData[index]['status'] = newStatus;
        updateStatus(updateUrl + clickedData.orderId, clickedData);
        setOpen(false);
    }

    const columns = [
        {title: 'OrderId', field: 'orderId'},
        {
            title: 'Created',
            field: 'created',
            render: rowData => <Moment format="MMMM Do YYYY h:mm:ss a">{rowData.created}</Moment>
        },
        {title: 'Customer', field: 'customer'},
        {title: 'Total', field: 'total', render: rowData => <span>${rowData.total}</span>},
        // {title: 'Profit', field: 'total'},
        {title: 'Status', field: 'status', render: rowData => getStatusChip(rowData, handleClickOpen)},

    ];

    const productColumns = [
        {
            field: 'skuImgUrls',
            title: 'Product',
            render: rowData => <img src={"images/bag.jpeg"} style={{height: 25}}/>
        },
        {title: 'SKU', field: 'sku'},
        {title: 'Product Name', field: 'skuName'},
        {title: 'Price', field: 'price', type: 'numeric', render: rowData => <span>${rowData.price}</span>},
        {title: 'Quantity', field: 'quantity', type: 'numeric', render: rowData => <span>x{rowData.quantity}</span>},
        {
            title: 'Discount',
            field: 'discount',
            type: 'numeric',
            render: rowData => <span style={{color: "red"}}>{rowData.discount}%</span>
        },
        {title: 'Total', field: 'total', type: 'numeric'},
    ];

    return (<Grid container>
        <Grid className={classes.orderContainer} item xs={10}>
            <MaterialTable
                options={{headerStyle: {backgroundColor: "rgb(1, 87, 155)", color: '#FFF'}, paging: false}}
                // style={{padding: "0 30px"}}
                title="Orders"
                columns={columns}
                data={ordersData}
                detailPanel={rowData => {
                    let discountAmount = getDiscountAmount(rowData.discount, rowData.total);
                    return (
                        <div className={classes.table}>
                            <MaterialTable
                                title="Editable Example"
                                columns={productColumns}
                                data={rowData.products}
                                options={{paging: false, toolbar: false}}
                            />
                            <Box display="flex" flexDirection="row-reverse">
                                <Box className="invoiceContainer" justifyContent="flex-end">
                                    <Table size="small">
                                        <TableBody>
                                            <TableRow style={{border: "none"}}>
                                                <TableCell>Subtotal</TableCell>
                                                <TableCell align="right">${ccyFormat(rowData.total)}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Discount</TableCell>
                                                <TableCell
                                                    align="right">${ccyFormat(discountAmount)}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Shipping</TableCell>
                                                <TableCell
                                                    align="right">${ccyFormat(rowData.shippingAmount)}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Total</TableCell>
                                                <TableCell
                                                    align="right">${ccyFormat(rowData.total - discountAmount)}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Box>
                            </Box>
                        </div>
                    )
                }}
            />
        </Grid>
        <Grid item xs={2}>
            <Box height="100%" className={classes.orderOverview}>
                <List>
                    <ListItem>
                        <ListItemText classes={{secondary: classes.listItemText, primary: classes.primaryListItem}}
                                      primary="Orders Today" secondary={getOrdersByStatus(ordersData, "today")}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText classes={{secondary: classes.listItemText, primary: classes.primaryListItem}}
                                      primary="Pending Orders" secondary={getOrdersByStatus(ordersData, "Pending")}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText classes={{secondary: classes.listItemText, primary: classes.primaryListItem}}
                                      primary="Delivered" secondary={getOrdersByStatus(ordersData, "Completed")}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText classes={{secondary: classes.listItemText, primary: classes.primaryListItem}}
                                      primary="Cancelled" secondary={getOrdersByStatus(ordersData, "Cancelled")}/>
                    </ListItem>
                </List>
            </Box>
        </Grid>

        <Dialog fullWidth
                maxWidth="sm" disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogContent>
                <form className={classes.container}>
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="status">Status</InputLabel>
                        <Select
                            native
                            value={status}
                            onChange={event => handleChange(event, 'status')}
                            input={<Input id="status"/>}
                        >

                            {orderStatusMap(clickedData.shipmentType, status).map(status => {
                                return <option key={status} value={status}>{status}</option>
                            })}

                        </Select>
                    </FormControl>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleUpdate} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    </Grid>)
}

function updateStatus(url, request) {
    post(url, request, (data) => {
        toast.success('Order Status Updated Successfully')
    }, function (response) {

    })
}


function getOrders(url) {
    get(url, (data) => {
        return (data);
    }, function (response) {
        if (response.status === 409) { //CONFLICT
            toast.error('Application is not registered:  already exists')
        } else {
            toast.error('Application is not registered: Please try again')
        }
    })
}


export const useFetch = function (url) {
    const [ordersData, setOrdersData] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchUrl() {
        const response = await fetch(url);
        const json = await response.json();
        setOrdersData(json);
        setLoading(false);
    }

    useEffect(() => {
        fetchUrl();
    }, []);
    return [ordersData, loading];
};
