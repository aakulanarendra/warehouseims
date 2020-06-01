import React from 'react'
import './Product.css'
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";
import {Switch, Route} from "react-router-dom";

const url = "/inventories";

export default class Product extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }


    render() {
        return (
            <div>
                <Switch>

                </Switch>
            </div>
        )

    }
}