import React, {Component} from 'react'
import './Cart.css'
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {get} from "../../utils/client";
import {toast} from "react-toastify";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";


export default class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {cart: []}
    }


    componentDidMount() {
        const cartId = this.props.match.params.cartId;
        this.getCart("/cart/" + cartId);
    }
    render() {
        let cart = this.state.cart;
        let sum = cart ? cart.map((sku, index) => {
            return sum+(sku.cartAdded * sku.price);
        }):0;

        return (
            <div className="cart-container">
                <Grid container className="title">
                    <AppBar position="static">
                        <Toolbar>
                            <Typography type="title" color="inherit" style={{ flex: 1 }}>
                                Cart
                            </Typography>
                            <Typography type="title" color="inherit" style={{ flex: 1 }}>
                                SubTotal : {sum} $;
                            </Typography>
                            <div>
                                <Button edge="end" disableRipple="true" disableFocusRipple="true" fullWidth variant="contained" color="primary">
                                    Go To Checkout
                                </Button>
                            </div>
                        </Toolbar>
                    </AppBar>
                </Grid>


                <Paper>
                    <Grid item xs={12} md={12}>
                        <div>
                            <List>

                                {cart ? cart.map((sku, index) => {
                                    let price = sku.price+'$';

                                    let subtotal =sku.cartAdded * sku.price+"$";
                                    return  <div><ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FolderIcon/>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={sku.skuName}
                                            secondary={price}
                                        />
                                        {/*<ListItemText*/}
                                        {/*    primary="20$"*/}
                                        {/*/>*/}

                                        <ListItemText  edge="end">
                                            <FormControl>
                                                <InputLabel htmlFor="age-native-simple">Quantity</InputLabel>
                                                <Select
                                                    native
                                                    inputProps={{
                                                        name: 'quantity',
                                                        id: 'age-native-simple',
                                                    }}
                                                    value={sku.cartAdded}
                                                >
                                                    <option value="" />
                                                    <option value={1}>1</option>
                                                    <option value={2}>2</option>
                                                    <option value={3}>3</option>
                                                </Select>
                                            </FormControl>
                                        </ListItemText>
                                        <ListItemText
                                            primary={subtotal}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="Delete">
                                                <DeleteIcon/>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                        <Divider variant="inset" component="li"/>
                                    </div>
                                }) : ""
                                }


                            </List>
                        </div>
                    </Grid>
                </Paper>
            </div>
        )
    }

    getCart = (url) => {
        get(url, (data) => {
            this.setState({cart: data})
        }, function (response) {
            if (response.status === 409) { //CONFLICT
                toast.error('Application is not registered:  already exists')
            } else {
                toast.error('Application is not registered: Please try again')
            }
        })
    };
}