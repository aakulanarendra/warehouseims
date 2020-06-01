import React, { useEffect, useRef } from 'react'
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Grid from "@material-ui/core/Grid";
import { Typography } from "../../components/Wrappers";
import Moment from "react-moment";
import { get, getRoute } from "../../utils/client";
import * as Constants from "../../utils/constants";
import { createStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

function formatMoney(number) {
    return (number||0).toLocaleString('en-US', {style: 'currency', currency: 'USD'});
}



function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price };
}



function subtotal(items) {
    return items.map(({ total }) => total).reduce((sum, i) => sum + i, 0);
}
function getDiscountAmount(discount, total) {
    if (discount && discount.offerType === 'percentage') {
        return Number(discount.offerValue * total / 100);
    }
    return Number(discount && discount.offerValue || 0);

}

const TAX_RATE = 0.00;
const SHIPPING_RATE = 0.00;
const orderCustomer = Constants.ORDER_CUSTOMER_URL;



export default class OrderInvoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {customer:{}}
    }

    componentDidMount() {
        get(getRoute(orderCustomer, this.props.order.orderId), (data) => {
            this.state.customer = data;
        }, function (response) {

        })
    }

    render() {


        const order = this.props.order;
        const customer = this.state.customer;
        const address = customer.addressList&&customer.addressList[0]||{};

        const invoiceSubtotal = subtotal(order.products||[]);
        const invoiceTaxes = TAX_RATE * invoiceSubtotal;
        const invoiceTotal = invoiceTaxes + invoiceSubtotal;
        return (
            <div style={{padding:"20px"}}>

                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                        <Typography style={{padding:"10px"}}>IMS</Typography>
                    <Typography style={{padding:"10px"}}>#Order Number: {order.orderId}</Typography>
                        <Typography style={{padding:"10px"}}>Order Date: <Moment format="MMMM Do YYYY h:mm:ss a">{order.created}</Moment></Typography>
                </Grid>
                <Grid container>
                    <Grid item sm={6} style={{padding:"30px"}}>
                        <Typography weight={"medium"} size={"md"} style={{padding:"2px"}}>Customer Details</Typography>
                        <Typography size={"sm"} style={{padding:"2px"}}>{customer.firstName}</Typography>
                        <Typography size={"sm"} style={{padding:"2px"}}>{customer.lastName}</Typography>
                        <Typography size={"sm"} style={{padding:"2px"}}>{customer.phone}</Typography>

                    </Grid>
                    <Grid item sm={6} style={{padding:"30px"}}>
                        <Typography weight={"medium"} size={"md"} style={{padding:"2px"}}>Shipping Details</Typography>
                        <Typography  style={{padding:"2px"}}>{address.addressLineOne}</Typography>
                        <Typography  style={{padding:"2px"}}>{address.addressLineTwo}</Typography>
                        <Typography  style={{padding:"2px"}}>{address.city}</Typography>
                        <Typography  style={{padding:"2px"}}>{address.state}</Typography>
                    </Grid>
                </Grid>
                <Grid container>

                    <Grid item sm={12}>
                        <Table style={{minWidth:'700px'}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Product</TableCell>
                                    <TableCell align="left">Quantity</TableCell>
                                    <TableCell align="left">Price</TableCell>
                                    <TableCell align="left">Discount</TableCell>
                                    <TableCell align="left">Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(order.products || []).map(row => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.skuName}
                                        </TableCell>
                                        <TableCell align="left">{row.quantity}</TableCell>
                                        <TableCell align="left">{formatMoney(row.price)}</TableCell>
                                        <TableCell align="left">{row.discount}%</TableCell>
                                        <TableCell align="left">{formatMoney(row.total)}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell rowSpan={6} />
                                    <TableCell colSpan={3}>Subtotal</TableCell>
                                    <TableCell align="right">{formatMoney(invoiceSubtotal)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Tax</TableCell>
                                    <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                                    <TableCell align="right">{formatMoney(invoiceTaxes)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Shipping</TableCell>
                                    <TableCell colSpan={3}
                                        align="right">{formatMoney(order.shippingAmount)}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Discount</TableCell>
                                    <TableCell colSpan={3}
                                        align="right">{formatMoney(getDiscountAmount(order.discount, order.total))}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Total</TableCell>
                                    <TableCell colSpan={3}
                                        align="right">{formatMoney(order.total - getDiscountAmount(order.discount, order.total))}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>

            </div>
        );
    }
}
