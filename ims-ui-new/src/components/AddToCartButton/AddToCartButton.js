import React from 'react'
import IconButton from "@material-ui/core/IconButton";
import {AddCircleOutline, AddShoppingCart, Delete, RemoveCircleOutline} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";


export default function AddToCartButton(props) {
    const {onClickCart, onRemoveCart, value,onQuantityChange,inputQuantity, setInputQuantity} = props;

    const toggleInput = () =>{
        setInputQuantity(true)
    }

    const focusOutInput = () =>{
        setInputQuantity(false)
    }

    const AddToCartBtn = () => {
        let button;
        if (!value) {
            button = <span> <IconButton color="primary"> <AddShoppingCart/></IconButton> Add to Cart </span>;
            return <Button onClick={onClickCart} fullWidth variant="outlined" color="primary">{button}</Button>
        } 
            button = value === 1 ?
                <div className="spanFullwidth">
                    <IconButton edge="start" onClick={onRemoveCart} color="primary"> <Delete/> </IconButton>

                    {inputQuantity  ?
                        <TextField
                        id="inputQuantity"
                        defaultValue={value}
                        margin="normal"
                        onBlur={focusOutInput}
                        onChange={onQuantityChange}
                        autoFocus
                        inputProps={{ 'aria-label': 'bare' }}
                    /> :
                        <span style={{padding: '25px'}}>
                        <Chip onClick={toggleInput}
                               variant="outlined" label={value}
                              avatar="none"
                               color="primary" size="small"
                                />
                        </span>}
                    <IconButton edge="end" onClick={onClickCart} color="primary"> <AddCircleOutline/> </IconButton>
                </div>
                : <div className="spanFullwidth">
                    <IconButton edge="start" onClick={onRemoveCart} color="primary"><RemoveCircleOutline/> </IconButton>
                    {inputQuantity  ?
                        <TextField
                            id="inputQuantity"
                            defaultValue={value}
                            margin="normal"
                            onBlur={focusOutInput}
                            onChange={onQuantityChange}
                            autoFocus
                            inputProps={{ 'aria-label': 'bare' }}
                        /> :
                        <span style={{padding: '25px'}}>
                        <Chip onClick={toggleInput}
                              variant="outlined" label={value}
                              avatar="none"
                              color="primary" size="small"
                        />
                        </span>}
                    <IconButton edge="end" onClick={onClickCart} color="primary"> <AddCircleOutline/> </IconButton>
                </div>;
            return <Button disableRipple="true" disableFocusRipple="true" fullWidth variant="outlined"
                           color="primary">{button}</Button>
        
    }

    return (
        <AddToCartBtn/>
    )
}