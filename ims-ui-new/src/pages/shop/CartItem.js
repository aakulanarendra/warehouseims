import React from 'react'
import Grid from '@material-ui/core/Grid/index';
import Paper from '@material-ui/core/Paper/index';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button/index";
import * as Constants from "../../utils/constants";
import { useCartDispatch } from "../../context/CartContext";
import QuantityButton from "../../components/AddToCartButton/QuantityButton";
import { Image } from "cloudinary-react";
import { Typography } from "../../components/Wrappers";
import BrowseQuantityButton from "../../components/AddToCartButton/BrowseQuantityButton";
import CardActions from "@material-ui/core/CardActions";

const orderurl = Constants.ORDERS_PLACE_URL;

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto'
    },
    image: {
        width: 80,
        height: 80,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    button: {},
    input: {
        display: 'none',
    },
}));


export default function CartItem(props) {
    const classes = useStyles();
    const item = props.cartItemData;
    const cartDispatch = useCartDispatch();
    const [inputQuantity, setInputQuantity] = React.useState(false);

    const changeQuantity = (event, product) => {
        if (event.target.value) {
            const inputValue = parseInt(event.target.value);
            const quantity = inputValue < product.available ? inputValue : product.available;
        }
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Button className={classes.image}>
                            <Image publicId={item.imageUrls[0]} width="80" height="50"/>
                        </Button>
                    </Grid>
                    <Grid item xs={5} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {item.desc}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    ${item.salePrice}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} sm container alignItems="center">
                        <Grid item xs={12}>
                            <BrowseQuantityButton value={item.quantity} id={item.barcode}
                                                  onAddToCart={() => cartDispatch({
                                                      type: "ADD",
                                                      payload: item
                                                  })}
                                                  onQuantityChange={(event) => cartDispatch({
                                                      type: "CHANGE_QNTY",
                                                      value: parseInt(event.target.value),
                                                      payload: item
                                                  })}
                                                  inputQuantity={inputQuantity}
                                                  setInputQuantity={setInputQuantity}
                                                  onClickCart={() => cartDispatch({
                                                      type: "ADD_ONE_QNTY",
                                                      payload: item
                                                  })}
                                                  removeFromCart={() => cartDispatch({
                                                      type: "REMOVE",
                                                      payload: item
                                                  })}
                                                  onRemoveCart={() => cartDispatch({
                                                      type: "REMOVE_ONE_QNTY",
                                                      payload: item
                                                  })}/>
                        </Grid>
                        {/*<Grid item xs={6} sm container justify="flex-end">*/}
                        {/*    <Grid>*/}
                        {/*        <Button className={classes.button} onClick={()=>{*/}
                        {/*            cartDispatch({*/}
                        {/*                type: "REMOVE",*/}
                        {/*                payload: item*/}
                        {/*            })*/}
                        {/*        }}>*/}
                        {/*            Remove*/}
                        {/*        </Button>*/}
                        {/*    </Grid>*/}
                        {/*</Grid>*/}
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}
