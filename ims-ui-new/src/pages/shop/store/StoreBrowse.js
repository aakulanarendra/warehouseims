import React from 'react'
import Grid from "@material-ui/core/Grid";
import ItemSearchBar from "./ItemSearchBar";
import { useCartState } from "../../../context/CartContext";
import PlaceOrder from "../PlaceOrder";
import CartItem from "../CartItem";
import SideCartItem from "./SideCartItem";
import Paper from "@material-ui/core/Paper";


export default function StoreBrowse() {

    const cartData = useCartState();

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <ItemSearchBar/>
                    {cartData.searchProducts&&cartData.searchProducts.map(item => {
                        const matchedItems = cartData.items.filter((itemF) => itemF.barcode === item.barcode).map(({quantity}) => ({quantity}));
                        const quantityAdded = matchedItems.length ? matchedItems[0].quantity : 0;
                        item['quantity'] = quantityAdded;
                        return <CartItem key={item.barcode} cartItemData={item}/>
                    })}
                </Grid>
                <Grid item xs={4}>
                    <Paper>
                    {cartData.items.map(item => {
                        return <SideCartItem key={item.barcode} cartItemData={item}/>
                    })}
                    </Paper>
                    <PlaceOrder/>
                </Grid>
            </Grid>
        </>

    )
}
