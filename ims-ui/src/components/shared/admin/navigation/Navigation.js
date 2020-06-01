import React, {Component} from 'react'
import './Navigation.css'
import {Route, Switch} from 'react-router-dom'
import {Dashboard} from "../../../dashboard";
import {Customers} from "../../../customers";
import {Orders} from "../../../orders";
import {Inventory} from "../../../Inventory";
import Product from "../../../products/Product";
import ProductList from "../../../products/ProductList";
import AddProduct from "../../../products/AddProduct";
import Store from "../../../store/Store";
import AddCustomer from "../../../customers/AddCustomer";


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
                    <Route exact path='/customers' component={Customers}/>
                    <Route exact path='/orders' component={Orders}/>
                    <Route exact path='/inventory' component={Inventory}/>
                    <Route exact path='/products' component={ProductList}/>
                    <Route exact path='/products/:productId' component={AddProduct}/>
                    <Route exact path='/products/add' component={AddProduct}/>
                    <Route exact path='/customers/add' component={AddCustomer}/>
                    <Route exact path='/store' component={Store}/>
                    <Route exact path='/products/edit' component={AddProduct}/>
                </Switch>
            </div>
        )
    }
}
