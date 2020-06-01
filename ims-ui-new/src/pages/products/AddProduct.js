import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Toolbar, Typography } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import axios from "axios"
import { ValidatorForm } from "react-material-ui-form-validator";
import Dimensions from "./AddProductForm/Dimensions";
import ProductURL from "./AddProductForm/ProductURL";
import Logistics from "./AddProductForm/Logistics";
import Packaging from "./AddProductForm/Packaging";
import Attributes from "./AddProductForm/Attributes";
import Basic from "./AddProductForm/Basic";
import { get, handleImageUpload, patch, post } from "../../utils/client";
import { productStyles } from "./ProductStyle";
import Box from "@material-ui/core/Box";
import * as Constants from "../../utils/constants";
import { useSnackbar } from "notistack";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createStyles, makeStyles } from "@material-ui/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const addProductUrl = Constants.PRODUCT_ADD;
const updateProductUrl = Constants.PRODUCT_UPDATE;
const attributesUrl = Constants.ATTRIBUTE_LIST_URL;
const productEditId = Constants.PRODUCT_EDIT_ID;

function getSteps() {
    return ['Add Basic Info', 'Set Dimensions', 'Product Url', "Logistics", "Packaging", "Attributes", "Custom Fields"]
}

const progressStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > * + *': {
                marginLeft: theme.spacing(2),
            },
        },
    }),
);

function roundUpPrice(price, precision) {
    const rounder = Math.pow(10, precision);
    return (Math.round(price * rounder) / rounder).toFixed(precision)
}

function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default function AddProduct(props) {


    const id = props.match.params.id;
    let formref = React.createRef();
    const classes = productStyles();
    const progressclasses = progressStyles();
    const [data, setData] = React.useState(  {});
    const [action,setAction] =  React.useState(  "ADD");
    const [basicInfo, setBasicInfo] = React.useState( {});
    const [dimensions, setDimensions] = React.useState( {});
    const [productUrl, setProductUrl] = React.useState( {});
    const [logistics, setLogistics] = React.useState( {});
    const [packaging, setPackaging] = React.useState( {});
    const [loading, setLoading] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [attributes, setAttributes] = React.useState({});
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();


    useEffect(() => {
        if(id) {
            setEdit(true)
            setLoading(true)
            get(productEditId  + id, (data) => {
                setData(data);
                setBasicInfo(data.basicInfo)
                setDimensions(data.dimensions);
                setProductUrl(data.productUrl);
                setLogistics(data.logistics);
                setPackaging(data.packaging);
                setAttributes(data.attributes)
                setLoading(false)
            }, function (response) {
                setLoading(false)
            })
        }
    }, []);

    useEffect(() => {
        axios
            .get(attributesUrl)
            .then(result => setAttributes(result.data));
    }, []);

    function handleSaveProduct(event, errors) {

        formref.isFormValid(false).then((isValid) => {
            if (isValid) {

                basicInfo.salePrice = roundUpPrice(basicInfo.salePrice, 2);
                basicInfo.retailPrice = roundUpPrice(basicInfo.retailPrice, 2);

                const product = {
                    productId: basicInfo.barcode,
                    basicInfo,
                    dimensions,
                    productUrl,
                    logistics,
                    packaging,
                    attributes
                };

                let url = edit? updateProductUrl:addProductUrl;

                handleImageUpload(basicInfo.files,(data) => {
                    let imageIds = data.map((img) => `${img.public_id}.${img.format}` );
                    product.basicInfo['imageUrls'] = imageIds;
                    saveProduct(url, basicInfo.barcode, product, props,enqueueSnackbar);
                }, function (error) {
                    saveProduct(url, basicInfo.barcode, product, props,enqueueSnackbar);
                });

            }
        });

    }

    function handleUpdateProduct(event) {
        const product = {
            basicInfo,
            dimensions,
            productUrl,
            logistics,
            packaging,
            attributes
        };
        updateProduct(updateProductUrl, basicInfo.sku, product, props,enqueueSnackbar);
    }

    return (
        <Grid container className={progressclasses.root}>

            <Grid item xs={12} md={12}>
                <Box>
                    {loading&&
                    <LinearProgress />
                    }
                    <ValidatorForm
                        ref={(r) => {
                            formref = r;
                        }}
                        onError={errors => console.log(errors)}
                        onSubmit={handleSaveProduct}
                    >


                        <Paper className={classes.paper}>
                            <Typography variant="h6" className={classes.title}>
                                {edit? "Edit Product": "Add New Product" }
                            </Typography>
                        </Paper>


                        <Paper className={classes.paper}>
                            <Typography color="primary" variant="h5">Basic Information</Typography>
                            <Basic attributes={attributes} setAttributes={setAttributes} basicInfo={basicInfo}
                                   setBasicInfo={setBasicInfo}/>
                        </Paper>

                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <Paper className={classes.paper}>
                                    <Typography color="primary" variant="h5">Dimensions</Typography>
                                    <Dimensions dimensions={dimensions} setDimensions={setDimensions}/>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Paper className={classes.paper}>
                                    <Typography color="primary" variant="h5">Logistics</Typography>
                                    <Logistics logistics={logistics} setLogistics={setLogistics}/>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Paper className={classes.paper}>
                                    <Typography color="primary" variant="h5">Packaging & Attributes</Typography>
                                    <Packaging packaging={packaging} setPackaging={setPackaging}/>
                                    <Attributes attributes={attributes} setAttributes={setAttributes}/>
                                </Paper>
                            </Grid>
                        </Grid>

                        <Grid container spacing={4}>
                            <Grid item xs={12} md={12}>
                                <Paper className={classes.paper}>
                                    <Typography color="primary" variant="h5">Product URL</Typography>
                                    <ProductURL productUrl={productUrl} setProductUrl={setProductUrl}/>
                                </Paper>
                            </Grid>
                        </Grid>

                        <Grid container spacing={4}>
                            <Grid item xs={12} md={12}>
                                <Paper className={classes.paper}>
                                    <Toolbar>
                                        <Button variant="outlined" component={Link} to="/app/products" color=""
                                                className={classes.button}>
                                            <KeyboardArrowLeftIcon className={classes.rightIcon}/> Back
                                        </Button>
                                        {

                                            edit ?
                                                <Button variant="contained" onClick={handleUpdateProduct}
                                                        color="primary"
                                                        className={classes.button}>
                                                    <DoneIcon className={classes.rightIcon}/>Update
                                                </Button>

                                                :
                                                <Button type="submit" variant="outlined" color="primary"
                                                        className={classes.button}>
                                                    <DoneIcon className={classes.rightIcon}/>Save
                                                </Button>

                                        }

                                    </Toolbar>
                                </Paper>
                            </Grid>
                        </Grid>
                    </ValidatorForm>
                </Box>
            </Grid>

        </Grid>
    );
}

function saveProduct(url, skuId, request, props,enqueueSnackbar) {

    post(url, request, (data) => {
        props.history.push("/app/products");
        enqueueSnackbar(`Saved Product:${skuId} Info Successfully`,{
            variant: 'success'
        })
    }, function (response) {
        if (response.status === 409) { // CONFLICT
            enqueueSnackbar('Product is not saved:  already exists', {
                variant: 'error'
            })
        } else {
            enqueueSnackbar('Product is not saved: Please try again', {
                variant: 'error'
            })
        }
    })
}

function updateProduct(url, skuId, request, props,enqueueSnackbar) {
    post(url, request, (data) => {
        props.history.push("/app/products");
        enqueueSnackbar(`Updated Product:${skuId} Info Successfully`,{
            variant: 'success'
        })
    }, function (response) {
        enqueueSnackbar('Failed to update product: Please try again', {
            variant: 'error'
        })
    })
}
