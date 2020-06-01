import React, {Component} from 'react'
import './Browse.css'
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import {AddCircleOutline, AddShoppingCart, Delete, RemoveCircleOutline} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";


function AddToCartButton({id, value, onClickCart, removeCart}) {
    let button;
    if (!value) {
        button = <span> <IconButton color="primary"> <AddShoppingCart/></IconButton> Add to Cart </span>;
        return <Button onClick={onClickCart} fullWidth variant="outlined" color="primary">{button}</Button>
    } else {
        button = value === 1 ?
            <div className="spanFullwidth" >
                <IconButton edge="start" onClick={removeCart} color="primary"> <Delete/> </IconButton>
                {value}
                <IconButton edge="end" onClick={onClickCart} color="primary" > <AddCircleOutline/> </IconButton>
            </div>
            : <div className="spanFullwidth" >
                <IconButton edge="start" onClick={removeCart} color="primary"><RemoveCircleOutline/> </IconButton>
                     {value}
                <IconButton edge="end" onClick={onClickCart} color="primary"> <AddCircleOutline/> </IconButton>
              </div>;
        return <Button disableRipple="true" disableFocusRipple="true" fullWidth variant="outlined" color="primary">{button}</Button>
    }
}




export default class Browse extends Component {

    constructor() {
        super();
        this.state = {cartAdded: {'Jake': 1, 'Jon': 2}};
        // this.addTocart = this.addTocart.bind(this);
    }

    addTocart(id) {
        this.state.cartAdded[id] = (this.state.cartAdded[id] || 0) + 1;
        this.setState({
            cartAdded: this.state.cartAdded
        });
    }

    removeCart(id) {
        this.state.cartAdded[id] = (this.state.cartAdded[id] || 0) - 1;
        this.setState({
            cartAdded: this.state.cartAdded
        });
    }



    render() {
        var products = ['Jake', 'Jon', 'Thruster', "Tes1", "Test2", "Test3"];
        const self = this;

        return (
            <div>
                <Grid container>

                    <Grid container xs={3} sm={3}>
                    </Grid>

                    <Grid container spacing={3} xs={9} sm={9}>
                        {products.map((name, index) => {
                            return <Grid item xs={4}>
                                <Card className="card">
                                    <CardMedia
                                        component="div"
                                        className="media"
                                        title={name}
                                    > <img src={"images/bag.jpeg"} className="media"/></CardMedia>
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            20$
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">

                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        <AddToCartButton value={self.state.cartAdded[name]} id={name}
                                                         onClickCart={() => self.addTocart(name)}
                                                         removeCart={() => self.removeCart(name)}></AddToCartButton>
                                    </CardActions>
                                </Card>
                            </Grid>;
                        })}
                    </Grid>
                </Grid>
            </div>
        )
    }
}