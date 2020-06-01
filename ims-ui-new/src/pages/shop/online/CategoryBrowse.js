import React, { useEffect } from 'react'
import { browseStyles } from "./BrowseProductStyle";
import { get, getRoute } from "../../../utils/client";
import * as Constants from "../../../utils/constants";
import Grid from "@material-ui/core/Grid/index";
import { Typography } from "../../../components/Wrappers";
import Card from "@material-ui/core/Card/index";
import CardMedia from "@material-ui/core/CardMedia/index";
import CardContent from "@material-ui/core/CardContent/index";
import CardActions from "@material-ui/core/CardActions/index";
import { Image } from "cloudinary-react";
import { useCartDispatch, useCartState } from "../../../context/CartContext";
import BrowseQuantityButton from "../../../components/AddToCartButton/BrowseQuantityButton";

const categoryProductsList = Constants.CATEGORY_PRODUCTS_LIST_URL;

export default function CategoryBrowse(props) {
    const classes = browseStyles();
    const [products, setProducts] = React.useState([]);
    const id = props.match.params.id
    const cartData = useCartState();
    const cartDispatch = useCartDispatch();
    const {items} = useCartState();

    const [inputQuantity, setInputQuantity] = React.useState(false);

    const changeQuantity = (event, product) => {
        if (event.target.value) {
            const inputValue = parseInt(event.target.value);
            const quantity = inputValue < product.available ? inputValue : product.available;
        }
    };


    useEffect(() => {
        get(getRoute(categoryProductsList, id), (data) => {
            setProducts(data.productDetailList)
        }, function (response) {

        })
    }, []);


    function addToCart(event, data) {
        cartDispatch({type: "ADD", payload: data});
    }


    return (
        <>
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container spacing={3} xs={12} sm={12}>

                            {products.map((product, index) => {
                                const matchedItems = items.filter((item) => item.barcode === product.barcode).map(({quantity}) => ({quantity}));
                                const quantityAdded = matchedItems.length ? matchedItems[0].quantity : 0;
                                product['quantity'] = quantityAdded;
                                return <Grid item xs={3}>
                                    <Card className={classes.card}>
                                        <CardMedia
                                            className={classes.media}
                                            title="Paella dish"
                                        >
                                            <Image publicId={product.imageUrls[0]} height="200"/>
                                        </CardMedia>
                                        <CardContent className={classes.cardContent}>
                                            <Typography variant="body2" color="textPrimary" component="p">
                                                ${product.salePrice}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {product.name}
                                            </Typography>
                                        </CardContent>
                                        <CardActions disableSpacing style={{minHeight:"65px"}}>
                                            <BrowseQuantityButton value={product.quantity} id={product.barcode}
                                                                  onAddToCart={() => cartDispatch({
                                                                      type: "ADD",
                                                                      payload: product
                                                                  })}
                                                                  onQuantityChange={(event) => cartDispatch({
                                                                      type: "CHANGE_QNTY",
                                                                      value: parseInt(event.target.value),
                                                                      payload: product
                                                                  })}
                                                                  inputQuantity={inputQuantity}
                                                                  setInputQuantity={setInputQuantity}
                                                                  onClickCart={() => cartDispatch({
                                                                      type: "ADD_ONE_QNTY",
                                                                      payload: product
                                                                  })}
                                                                  removeFromCart={() => cartDispatch({
                                                                      type: "REMOVE",
                                                                      payload: product
                                                                  })}
                                                                  onRemoveCart={() => cartDispatch({
                                                                      type: "REMOVE_ONE_QNTY",
                                                                      payload: product
                                                                  })}/>

                                        </CardActions>
                                    </Card>
                                </Grid>;
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>

    )
}
