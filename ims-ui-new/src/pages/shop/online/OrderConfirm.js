import React, { useEffect, useRef } from 'react'
import * as Constants from "../../../utils/constants";
import { get, getRoute } from "../../../utils/client";
import Grid from "@material-ui/core/Grid/index";
import Typography from "@material-ui/core/Typography/index";
import Paper from "@material-ui/core/Paper/index";
import Box from "@material-ui/core/Box/index";
import Table from "@material-ui/core/Table/index";
import TableBody from "@material-ui/core/TableBody/index";
import TableRow from "@material-ui/core/TableRow/index";
import TableCell from "@material-ui/core/TableCell/index";
import Moment from "react-moment/dist/index";
import { useFetch } from "../../orders/Orders";
import { makeStyles } from "@material-ui/core/index";
import Chip from "@material-ui/core/Chip/index";
import {
    ErrorThemeProvider,
    OrangeThemeProvider,
    ProgressThemeProvider,
    SuccessThemeProvider,
    WarningThemeProvider
} from "../../../themes/customThemes";
import DoneIcon from '@material-ui/icons/Done';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import BlockIcon from '@material-ui/icons/Block';
import { Image } from "cloudinary-react";
import ReactToPrint from "react-to-print/lib/index";

import OrderInvoice from "../../orders/OrderInvoice";
import Button from "@material-ui/core/Button/index";
import Icon from "@material-ui/core/Icon/index";
import MaterialTable from "material-table";

const ordersbyid = Constants.ORDERS_BY_ID;


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
        margin: theme.spacing(2),
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
    },
    button:{
        margin: theme.spacing(2),
    }

}));

const pickUpOrderStatus = ["Pending", "Ready For PickUp", "PickedUp", "Completed", "Cancelled"];

const shipOrderStatus = ["Pending", "Packing Started", "Ready For Shipping", "Shipped", "Cancelled", "Completed"];

function ccyFormat(num) {
    return (num || 0).toFixed(2);
}


function getDiscountAmount(discount, total) {
    if (discount && discount.offerType === 'percentage') {
        return Number(discount.offerValue * total / 100);
    }
    return Number(discount && discount.offerValue || 0);

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
            return <WarningThemeProvider><Chip disabled onClick={e => handleClick(e, rowData)}
                                               style={{minWidth: '100px'}}
                                               variant="outlined" label={rowData.status}
                                               color="primary" size="small"
                                               icon={<MoreHorizIcon/>}/></WarningThemeProvider>;
        case 'Shipped':
        case 'PickedUp':
            return <ProgressThemeProvider><Chip disabled onClick={e => handleClick(e, rowData)}
                                                style={{minWidth: '100px'}}
                                                variant="outlined" label={rowData.status}
                                                color="primary" size="small"
                                                icon={<MoreHorizIcon/>}/></ProgressThemeProvider>;
        case 'Pending':
        case 'Packing Started':
            return <OrangeThemeProvider><Chip disabled onClick={e => handleClick(e, rowData)}
                                              style={{minWidth: '100px'}}
                                              variant="outlined" label={rowData.status}
                                              color="primary" size="small"
                                              icon={<MoreHorizIcon/>}/></OrangeThemeProvider>;
        case 'Cancelled':
            return <ErrorThemeProvider><Chip disabled style={{minWidth: '100px'}}
                                             variant="outlined" label={rowData.status}
                                             color="primary" size="small"
                                             icon={<BlockIcon/>}/></ErrorThemeProvider>;
        case 'Completed':
            return <SuccessThemeProvider><Chip disabled style={{minWidth: '100px'}}
                                               variant="outlined" label={rowData.status}
                                               color="primary" size="small"
                                               icon={<DoneIcon/>}/></SuccessThemeProvider>;
        default:
            return <SuccessThemeProvider><Chip disabled onClick={e => handleClick(e, rowData)}
                                               style={{minWidth: '100px'}}
                                               variant="outlined" label={rowData.status}
                                               color="primary" size="small"
                                               icon={<DoneIcon/>}/></SuccessThemeProvider>;

    }

}


function orderStatusMap(shipType, status) {
    let orderStatus = [];
    if (shipType === 'shipment') {
        orderStatus = pickUpOrderStatus;
    } else {
        orderStatus = shipOrderStatus;
    }

    const index = orderStatus.indexOf(status);
    if (index > 0) {
        orderStatus.splice(index, 1);
        orderStatus.unshift(status);
    }
    return orderStatus;
}


export default function ShopBrowse(props) {
    const classes = useStyles();

    const [order, setOrder] = React.useState([]);
    const [rowData, setRowData] = React.useState({});
    const id = props.match.params.id

    useEffect(() => {
        get(getRoute(ordersbyid, id), (data) => {
            setOrder(new Array(data));
            setRowData(data)
        }, function (response) {

        })
    }, []);

    const handleChange = (event, name) => {
        setNewStatus(event.target.value);
    };

    const [open, setOpen] = React.useState(false);
    const [status, setstatus] = React.useState();
    const [newStatus, setNewStatus] = React.useState();
    const [clickedData, setClickedData] = React.useState({});


    function handleClickOpen(e, rowData) {
        setOpen(true);
        setClickedData(rowData);
        setstatus(rowData.status);
    }

    const componentRef = useRef();


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
            render: rowData => <Image publicId={rowData.imageUrls[0]} height="80"/>
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


    return (
        <Grid>


            <Grid container>

                <Grid item xs={12} sm={12}>
                <div className={classes.table}>
                    <Paper className={classes.paper}>
                        <Typography style={{padding: "20px",display: 'inline-block'}} variant={"h4"} className={classes.header}> {id} Order Details</Typography>
                        <ReactToPrint
                            trigger={() => <Button variant={"outlined"} color={"primary"}>Invoice</Button>}
                            content={() => componentRef.current}
                        />
                        <div style={{ display: "none" }}> <OrderInvoice order={rowData} ref={componentRef} /></div>

                        <Button
                            variant="outlined"
                            color="primary"
                            className={classes.button}
                            endIcon={<Icon>send</Icon>}
                            onClick={() => {
                                props.history.push(`/app/orders`);
                            }}
                        >
                            Orders
                        </Button>

                        <Button
                            variant="outlined"
                            color="primary"
                            className={classes.button}
                            endIcon={<Icon>send</Icon>}
                            onClick={() => {
                                props.history.push(`/app/shop`);
                            }}
                        >
                            Shop Now
                        </Button>

                    </Paper>
                </div>
                </Grid>

                <Grid item xs={12} sm={8}>

                    <div className={classes.table}>
                        <MaterialTable
                            // style={{padding: "0 30px"}}
                            title="Orders"
                            columns={columns}
                            data={order}
                            options={{paging: false, toolbar: false}}
                        />
                    </div>

                    <div className={classes.table}>
                        <MaterialTable
                            title="Editable Example"
                            columns={productColumns}
                            data={rowData.products}
                            options={{paging: false, toolbar: false}}
                        />
                    </div>

                </Grid>

                <Grid item xs={12} sm={4}>
                    <div className={classes.table}>
                        <Paper className={classes.paper}>
                            <Table size="small">
                                <TableBody>
                                    <TableRow style={{border: "none"}}>
                                        <TableCell>Subtotal</TableCell>
                                        <TableCell align="right">${ccyFormat(rowData.total)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Discount</TableCell>
                                        <TableCell
                                            align="right">${ccyFormat(getDiscountAmount(rowData.discount, rowData.total))}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Shipping</TableCell>
                                        <TableCell
                                            align="right">${ccyFormat(rowData.shippingAmount)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Total</TableCell>
                                        <TableCell
                                            align="right">${ccyFormat(rowData.total - getDiscountAmount(rowData.discount, rowData.total))}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Paper>
                    </div>
                </Grid>
            </Grid>


        </Grid>
    )
}
