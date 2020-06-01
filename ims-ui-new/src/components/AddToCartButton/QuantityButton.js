import React from 'react'
import IconButton from "@material-ui/core/IconButton";
import {AddCircleOutline, RemoveCircleOutline} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";


export default function QuantityButton(props) {
    const {onClickCart, onRemoveCart, value, onQuantityChange, setInputQuantity} = props;


    const focusOutInput = () => {
        setInputQuantity(false)
    };

    const AddToCartBtn = () => {

        return (
            <Grid className="spanFullwidth">
                <IconButton disabled={value<=1} edge="start" onClick={onRemoveCart} color="primary"> <RemoveCircleOutline/> </IconButton>
                <TextField
                    id="inputQuantity"
                    defaultValue={value}
                    margin="dense"
                    onBlur={focusOutInput}
                    onChange={onQuantityChange}
                    inputProps={{'aria-label': 'bare',style: { textAlign: "center" ,padding:'8px'}}}
                    variant="outlined"
                    style={{width:'65px',textAlign: 'center'}}
                />
                <IconButton edge="end" onClick={onClickCart} color="primary"> <AddCircleOutline/> </IconButton>
            </Grid>
        )
    };


    return (
        <AddToCartBtn/>
    )
}