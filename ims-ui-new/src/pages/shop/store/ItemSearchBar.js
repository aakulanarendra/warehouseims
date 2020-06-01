import React, { createRef, useEffect, useRef, useState } from 'react'
import SearchBar from "material-ui-search-bar";
import * as Constants from "../../../utils/constants";
import { get } from "../../../utils/client";
import { useCartDispatch, useCartState } from "../../../context/CartContext";
import { browseStyles } from "../BrowseProductStyle";
import { useSnackbar } from "notistack";
import BarcodeReader from 'react-barcode-reader'
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import Divider from "@material-ui/core/Divider";
import { createStyles, makeStyles } from "@material-ui/styles";

const productSearch = Constants.SEARCH_PRODUCTS;
const productById = Constants.PRODUCT_BY_ID;

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: "auto",
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
    }),
);


export default function ItemSearchBar(props) {
    const classes = useStyles();
    const cartData = useCartState();
    const cartDispatch = useCartDispatch();
    const [searchParam, setSearchParam] = useState("");
    const [open, setOpen] = React.useState(false);
    const [isBarcodeScan, setIsBarcodeScan] = React.useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    let inputSearchRef = createRef();


    const handleChange = (event,type) => {

                const searchParamText = event && event.target.value;
                setSearchParam(searchParamText);
    };

    const handleError = (event) => {
        console.log("error scan")
        // setSearchParam(event);
    };

    const handleScan = (data) => {
        console.log("barcode scan")

        // get(productById + searchParamText, (data) => {
        //     enqueueSnackbar(`${data.barcode} Added to cart`,{
        //         variant: 'info'
        //     })
        //     cartDispatch({
        //         type: "ADD",
        //         payload: data
        //     })
        // }, (response) => {
        //     if (response.status === 404) {
        //         enqueueSnackbar(`Something went wrong`,{
        //             variant: 'error'
        //         })
        //     }
        // })

    };


    const onKeyPress = (event) => {
        console.log("key scan",event&&event.key)
        if (event&&event.key === 'Enter') {
            searchProduct();
        }
        setIsBarcodeScan(false);
    };


    const onCancelSearch = (event) => {
        setSearchParam("");
        cartDispatch({type: "SEARCH_PRODUCTS", payload: []});
    };

    const searchProduct = (event) => {
        get(productSearch + searchParam, (data) => {
            enqueueSnackbar(`${data.productDetailList.length} products found for ${searchParam}`,{
                variant: 'info'
            })

            data.productDetailList.map(product=>{
                if(product.barcode===searchParam){
                    cartDispatch({
                        type: "ADD",
                        payload: product
                    })
                }
            })

            cartDispatch({type: "SEARCH_PRODUCTS", payload: data.productDetailList});
        }, (response) => {
            if (response.status === 404) {
                enqueueSnackbar(`Something went wrong`,{
                    variant: 'error'
                })
            }
        })
    };


    return (

        <>
        {/*<BarcodeReader*/}
        {/*    onError={handleError}*/}
        {/*    onScan={handleScan}*/}
        {/*/>*/}

            <Paper className={classes.root}>
                <InputBase autoFocus={true}
                           type={"text"}
                           onKeyDown={(event) => onKeyPress(event)}
                           onChange={(event)=>handleChange(event,"manual")}
                    className={classes.input}
                           value={searchParam}
                    placeholder="Scan Barcode or Search Product"
                    inputProps={{ 'aria-label': 'search google maps' }}


                />
                <IconButton onClick={() => searchProduct()} color="primary" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton  onClick={()=>onCancelSearch()} color="primary" className={classes.iconButton} aria-label="directions">
                    <ClearIcon/>
                </IconButton>
            </Paper>
        {/*<SearchBar*/}
        {/*    onChange={(event)=>handleChange(event,"manual")}*/}
        {/*    onRequestSearch={() => searchProduct()}*/}
        {/*    onCancelSearch={()=>onCancelSearch()}*/}
        {/*    inputRef={inputSearchRef}*/}
        {/*    value={searchParam}*/}
        {/*    style={{*/}
        {/*        margin: '0 0 10px auto',*/}
        {/*    }}*/}
        {/*/>*/}
        </>

    )
}

