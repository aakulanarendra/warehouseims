import React, {useEffect} from 'react'
import MaterialTable, {MTableToolbar} from "material-table";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Moment from "react-moment";
import {sortBy} from "lodash";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Add as AddIcon, AddCircleOutline } from "@material-ui/icons";
import AddCustomer from "./AddCustomer";
import {get} from "../../utils/client";
import {CUSTOMER_LIST_URL} from "../../utils/constants";
import {Rating} from "../../components/Wrappers";
import {Link as RouterLink} from "react-router-dom";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";

const customerList = CUSTOMER_LIST_URL;

function getLastOrder(rowData) {
    const order = sortBy(rowData.orders||[], ['created'])[0];
    if (order) {
        return <Moment format="MMMM Do YYYY h:mm:ss a">{order.orderDate}</Moment>
    } 
        return <span>No Order</span>
    
}

function getValue(rowData) {
    if(rowData.orders || [].length) {
        return rowData.orders.map(({orderTotal}) => orderTotal).reduce((sum, i) => sum + i, 0) || 0;
    }
        return 0;
    
}

function getTotalOrders(rowData) {
    const orderCount = (rowData.orders||[].length);
    return  orderCount > 0 ? orderCount : "N/A";
}

export default function Customers() {
    const [open, setOpen] = React.useState(false);

    function openAdd() {
        setOpen(true);
    }

    const [state, setState] = React.useState({
        columns: [
            {
                title: 'Name',
                field: 'orderId',
                render: rowData => <Link component={RouterLink} to={`customers/${rowData.customerId}`}>{rowData.customerName}</Link>
            },
            {
                title: 'Rating',
                field: 'created',
                render: rowData => <Rating color="green" rating={rowData.rating}/>
            },
            {
                title: 'Orders',
                field: 'customer',
                render: rowData => <span>{getTotalOrders(rowData)}</span>
            },
            {
                title: 'LTV',
                field: 'total',
                render: rowData => <span>${getValue(rowData)}</span>
            },
            {
                title: 'Last Order',
                field: 'total',
                render: rowData => <span>{getLastOrder(rowData)}</span>
            },
            {
                title: 'Phone',
                field: 'status',
                render: rowData => <span>{rowData.phone}</span>
            },
            // {
            //     title: 'Role',
            //     field: 'role',
            //     render: rowData => <span>{rowData.role}</span>
            // }

        ],
        data: [],
    });

    const updateData = (data) => {
        data = {...data,'customerName':`${data.firstName} ${data.lastName}`}
        data = sortBy([...state.data || [], data],'createdOn').reverse();
        setState({...state, 'data': data})
    };

    useEffect(() => {
        get(customerList, (data) => {
            setState({...state, 'data': data})
        }, function (response) {

        })

    }, []);


    return (
        <Grid item xs={12}>
            <MaterialTable
                title="Customers"
                columns={state.columns}
                data={state.data}
                components={{
                    Toolbar: props => (
                        <Toolbar style={{padding: '5px', width: '100%', justifyContent: 'space-between'}}>
                            <MTableToolbar {...props} />
                            <IconButton color="primary" onClick={openAdd} aria-label="Add">
                                <AddIcon/>
                            </IconButton>
                        </Toolbar>

                    ),
                }}
            />
            {open && <AddCustomer open={open} setOpen={setOpen} updateData={updateData}/>}
        </Grid>
    )
}