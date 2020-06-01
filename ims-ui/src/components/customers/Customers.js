import React, {useEffect, useState} from 'react'
import MaterialTable, {MTableToolbar} from "material-table";
import {makeStyles} from '@material-ui/core/styles';
import Chip from "@material-ui/core/Chip";
import {SuccessThemeProvider, WarningThemeProvider} from "../../theme/muiTheme";
import DoneIcon from '@material-ui/icons/Done';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import Toolbar from "@material-ui/core/Toolbar";
import Icon from "@material-ui/core/Icon";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {sortBy} from "lodash";
import Moment from "react-moment";

const url = "/customerlist";
const updateUrl = "/order/status/";
const TAX_RATE = 0.07;


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
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
    customerOverview: {
        backgroundColor: 'rgba(133,175,255,0.17)',
        padding: '20px',
        minHeight: '90vh',
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
    icon: {},

}));

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

function getCustomersByStatus(customers, status) {
    if (status === "total") {
        return customers.length;
    } else {
        return customers.reduce((total, order) => (order.status === status ? total + 1 : total), 0)
    }
}

function getStatusChip(rowData, handleClick) {
    switch (rowData.status) {
        case 'Pending':
            return <WarningThemeProvider><Chip onClick={e => handleClick(e, rowData)} style={{minWidth: '100px'}}
                                               variant="outlined" label={rowData.status}
                                               color="primary" size="small"
                                               icon={<MoreHorizIcon/>}/></WarningThemeProvider>;
        default:
            return <SuccessThemeProvider><Chip onClick={e => handleClick(e, rowData)} style={{minWidth: '100px'}}
                                               variant="outlined" label={rowData.status}
                                               color="primary" size="small"
                                               icon={<DoneIcon/>}/></SuccessThemeProvider>;

    }

}

function getLastOrder(rowData) {
    let order = sortBy(rowData.orders,['created'])[0];
    if(order) {
        return <Moment format="MMMM Do YYYY h:mm:ss a">{order.orderDate}</Moment>
    }else{
        return <span>No Order</span>
    }
}

function getValue(rowData) {
    return rowData.orders.map(({orderTotal}) => orderTotal).reduce((sum, i) => sum + i, 0);
}

function getTotalOrders(rowData) {
    return rowData.orders.length;
}

export default function Customers() {

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
        ordersData[index]['status'] = newStatus;
        setOpen(false);
    }

    const columns = [
        {title: 'Name', field: 'orderId', render: rowData => <span>{rowData.customerName}</span>},
        {
            title: 'Rating',
            field: 'created',
            render: rowData => <span><Icon className={classes.icon} color="primary">star_rate</Icon>{rowData.rating}</span>
        },
        {
            title: 'Orders',
            field: 'customer',
            render: rowData => <span>{getTotalOrders(rowData)}</span>
        },
        {title: 'LTV', field: 'total',  render: rowData => <span>${getValue(rowData)}</span>},
        {
            title: 'Last Order', field: 'total',
            render: rowData => <span>{getLastOrder(rowData)}</span>
        },
        {title: 'Phone', field: 'status', render: rowData => <span>{rowData.phone}</span>},

    ];

    const customerExpandColumns = [];

    const orderStatus = ["New", "Pending", "Ready For Shipping", "PickedUp", "Cancelled", "Completed"];

    return (<Grid container className={classes.root}>
        <Grid className={classes.orderContainer} item xs={10}>


            <MaterialTable
                options={{headerStyle: {backgroundColor: "rgb(1, 87, 155)", color: '#FFF'}, paging: false}}
                // style={{padding: "0 30px"}}
                title="Customers"
                columns={columns}
                data={ordersData}
                components={{
                    Toolbar: props => (
                        <Toolbar style={{padding: 0, width: '100%', justifyContent: 'space-between'}}>
                            <MTableToolbar {...props} />
                            <Button component={Link} to="/customers/add/" variant="outlined" color="primary">
                                <AddIcon/> Add Customer
                            </Button>
                        </Toolbar>

                    ),
                }}
                detailPanel={rowData => {
                    return (
                        <div></div>
                    )
                }}
            />
        </Grid>
        <Grid item xs={2}>
            <Box height="100%" className={classes.customerOverview}>
                <List>
                    <ListItem>
                        <ListItemText classes={{secondary: classes.listItemText, primary: classes.primaryListItem}}
                                      primary="Total Customers" secondary={getCustomersByStatus(ordersData, "total")}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText classes={{secondary: classes.listItemText, primary: classes.primaryListItem}}
                                      primary="New Today" secondary={getCustomersByStatus(ordersData, "new")}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText classes={{secondary: classes.listItemText, primary: classes.primaryListItem}}
                                      primary="Returning" secondary={getCustomersByStatus(ordersData, "returning")}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText classes={{secondary: classes.listItemText, primary: classes.primaryListItem}}
                                      primary="Online" secondary={getCustomersByStatus(ordersData, "online")}/>
                    </ListItem>
                </List>
            </Box>
        </Grid>
    </Grid>)
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
