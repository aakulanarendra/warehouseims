import React from 'react'
import IconButton from "@material-ui/core/IconButton";
import { AddCircleOutline, Delete, RemoveCircleOutline } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/core/SvgIcon/SvgIcon";



export default function BrowseQuantityButton(props) {
    const {onClickCart, onAddToCart,removeFromCart, onRemoveCart, value, onQuantityChange, setInputQuantity} = props;


    const focusOutInput = () => {
        setInputQuantity(false)
    };

    const AddToCartBtn = () => {

        return (
            <>
                {value === 0 ?
                    <Button onClick={onAddToCart} size="small"
                            fullWidth variant="outlined" color="primary"
                    >
                        Add
                    </Button> :
                    <Grid className="spanFullwidth">

                        {value === 1 ?
                            <IconButton edge="start" onClick={removeFromCart} color="primary"> <Delete/>
                            </IconButton>
                            :
                            <IconButton edge="start" onClick={onRemoveCart} color="primary"> <RemoveCircleOutline/>
                            </IconButton>
                        }
                        < TextField
                            id="inputQuantity"
                            defaultValue={value}
                            margin="dense"
                            onBlur={focusOutInput}
                            onChange={onQuantityChange}
                            inputProps={{'aria-label': 'bare', style: {textAlign: "center", padding: '8px'}}}
                            variant="outlined"
                            style={{width: '65px', textAlign: 'center'}}
                        />
                        <IconButton edge="end" onClick={onClickCart} color="primary"> <AddCircleOutline/> </IconButton>
                    </Grid>
                }
            </>
        )
    };


    return (
        <AddToCartBtn/>
    )
}