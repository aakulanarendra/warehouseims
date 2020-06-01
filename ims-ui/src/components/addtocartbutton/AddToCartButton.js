import React, {Component} from 'react'
import IconButton from "@material-ui/core/IconButton";
import {AddCircleOutline, AddShoppingCart, Delete, RemoveCircleOutline} from "@material-ui/icons";
import Button from "@material-ui/core/Button";


function AddToCartBtn({id, value, onClickCart, onRemoveCart}) {
    let button;
    if (!value) {
        button = <span> <IconButton color="primary"> <AddShoppingCart/></IconButton> Add to Cart </span>;
        return <Button onClick={onClickCart} fullWidth variant="outlined" color="primary">{button}</Button>
    } else {
        button = value === 1 ?
            <div className="spanFullwidth" >
                <IconButton edge="start" onClick={onRemoveCart} color="primary"> <Delete/> </IconButton>
                {value}
                <IconButton edge="end" onClick={onClickCart} color="primary" > <AddCircleOutline/> </IconButton>
            </div>
            : <div className="spanFullwidth" >
                <IconButton edge="start" onClick={onRemoveCart} color="primary"><RemoveCircleOutline/> </IconButton>
                {value}
                <IconButton edge="end" onClick={onClickCart} color="primary"> <AddCircleOutline/> </IconButton>
            </div>;
        return <Button disableRipple="true" disableFocusRipple="true" fullWidth variant="outlined" color="primary">{button}</Button>
    }
}

export default class AddToCartButton extends Component {

    constructor(props) {
        super(props);
        this.state = {expanded: false}
    }

    render() {
        return(
            <AddToCartBtn value={this.props.value} id={""}
                         onClickCart={this.props.onClickCart}
                          onRemoveCart={this.props.onRemoveCart}></AddToCartBtn>
        )
    }
}