import React, {Component} from 'react'
import './PDP.css'
import Grid from "@material-ui/core/Grid";
import {get} from "../../utils/client";
import {toast} from "react-toastify";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import StarIcon from '@material-ui/icons/Star';
import Typography from "@material-ui/core/Typography";
import AddToCartButton from "../addtocartbutton/AddToCartButton";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import {ShoppingCart} from "@material-ui/icons";

export default class PDP extends Component {

    constructor() {
        super();
        this.state = {product: {},skuCount: 0}
    }

    componentDidMount() {
        const skuId = this.props.match.params.productId;
        this.getSku("/sku/" + skuId);
    }

    pdpaddTocart(id) {
        this.state.skuCount += 1;
        this.setState({
            skuCount: this.state.skuCount
        });
    }

    pdpremoveCart(id) {
        this.state.skuCount = (this.state.skuCount) - 1;
        this.setState({
            skuCount: this.state.skuCount
        });
    }
    render() {

        let self = this;
        const product = this.state.product;
        return (<div>
                <Grid container>
                    <Grid item xs={8} sm={8}>
                        <Grid container className="pdp-main">
                            <Grid container>
                                <Typography variant="h5" className="pdp-title">
                                    {product.skuName}
                                </Typography>
                            </Grid>
                            <Grid container>
                                <Grid item xs={8} sm={8}>
                                    <img src={"images/bag.jpeg"} alt="Bag" className="pdp-media"/>
                                </Grid>
                                <Grid item xs={4} sm={4} className="pdp-about-product">
                                    About this product:
                                    {product.skuDesc ? product.skuDesc.map((name, index) => {
                                        return <List disablePadding={"true"} dense={"true"}>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <StarIcon/>
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={name}
                                                />
                                            </ListItem>
                                        </List>
                                    }) : ""
                                    }
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                    <Grid className="pdp-add" item xs={3} sm={3}>
                        <Grid container>
                        </Grid>
                        <Grid container>
                            <div className="price-info">
                            $ {product.price}
                            </div>
                            <div className="add-to-cart">
                                <AddToCartButton value={self.state.skuCount} id={product.skuId}
                                                 onClickCart={() => self.pdpaddTocart(product.skuId)}
                                                 onRemoveCart={() => self.pdpremoveCart(product.skuId)}></AddToCartButton>
                            </div>
                            <div className="add-to-cart">
                                <Button disableRipple="true" disableFocusRipple="true" fullWidth variant="contained" color="primary">
                                    <div className="spanFullwidth" >
                                        <span> <IconButton color="inherit"> <ShoppingCart/></IconButton> Go to Cart </span>
                                    </div>
                                </Button>

                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }


    getSku = (url) => {
        get(url, (data) => {
            this.setState({product: data})
        }, function (response) {
            if (response.status === 409) { //CONFLICT
                toast.error('Application is not registered:  already exists')
            } else {
                toast.error('Application is not registered: Please try again')
            }
        })
    };
}