import React, {Component} from 'react'
import './Navigation.css'
import {Route, Switch} from 'react-router-dom'
import {Dashboard} from "../../../dashboard";
import {Orders} from "../../../orders";
import {Inventory} from "../../../Inventory";
import {Browse} from "../../../browse";
import {PDP} from "../../../pdp";
import Cart from "../../../cart/Cart";
import Product from "../../../products/Product";


export default class Navigation extends Component {
    constructor() {
        super()
        this.state = {activeItem: 'dashboard'}
        this.handleItemClick = (e, {name}) => this.setState({activeItem: name})
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={Dashboard}/>
                    <Route exact path='/browse' component={Browse}/>
                    <Route exact path='/pdp/:productId' component={PDP}/>
                    <Route exact path='/products' component={Product}/>
                    <Route exact path='/orders' component={Orders}/>
                    <Route exact path='/inventory' component={Inventory}/>
                    <Route exact path='/cart/:cartId' component={Cart}/>
                </Switch>
            </div>
        )
    }
}
