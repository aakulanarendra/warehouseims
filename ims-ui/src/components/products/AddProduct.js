import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Toolbar from "@material-ui/core/Toolbar";
import DoneIcon from '@material-ui/icons/Done';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import {get, patch, post} from "../../utils/client";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Grid from "@material-ui/core/Grid";
import Dimensions from "./AddProductForm/Dimensions";
import ProductURL from "./AddProductForm/ProductURL";
import Logistics from "./AddProductForm/Logistics";
import Packaging from "./AddProductForm/Packaging";
import Attributes from "./AddProductForm/Attributes";
import Basic from "./AddProductForm/Basic";
import axios from "axios"
import FormCode from "./AddProductForm/TestRedux";
import {ValidatorForm} from "react-material-ui-form-validator";
import StepButton from "@material-ui/core/StepButton";

function getSteps() {
    return ['Add Basic Info', 'Set Dimensions', 'Product Url', "Logistics", "Packaging", "Attributes", "Custom Fields"]
}

function roundUpPrice(price,precision){
    let rounder = Math.pow(10, precision);
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

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing(1),
    },
    leftIcon: {
        marginRight: theme.spacing(1),
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
    iconSmall: {
        fontSize: 20,
    },
    mainContainer: {
        boxShadow: '0 3px 5px 2px rgba(84, 81, 82, 0.3)',
        margin: theme.spacing(2)
    }
}));

export default function AddProduct(props) {


    const {action, data} = props.location.state ? props.location.state : {action: 'new', data: {}};

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    function handleNext() {
        formref.isFormValid(false).then((isValid) => {
            if (isValid) {
                setActiveStep(prevActiveStep => prevActiveStep + 1);
            }
        });

    }

    const handleStep = step => () => {
        setActiveStep(step);
    };


    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

    function handleReset() {
        setActiveStep(0);
    }

    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <Basic attributes={attributes} setAttributes={setAttributes} basicInfo={basicInfo}
                              setBasicInfo={setBasicInfo}/>;
            // return <FormCode/>
            case 1:
                return <Dimensions dimensions={dimensions} setDimensions={setDimensions}/>;
            case 2:
                return <TabContainer><ProductURL productUrl={productUrl} setProductUrl={setProductUrl}/></TabContainer>;
            case 3:
                return <TabContainer><Logistics logistics={logistics} setLogistics={setLogistics}/></TabContainer>;
            case 4:
                return <TabContainer><Packaging packaging={packaging} setPackaging={setPackaging}/></TabContainer>;
            case 5:
                return <TabContainer><Attributes attributes={attributes} setAttributes={setAttributes}/></TabContainer>;
            case 6:
                return <TabContainer>TODO: Add Custom fields</TabContainer>
            default:
                return 'Unknown step';
        }
    }


    // let productId = this.props.match.params.productId;
    // if(productId&&!props.location.state){
    //     data = this.getSku("/products/" + skuId);
    // }

    // useEffect(async () => {
    //     const result = await axios(
    //         'http://hn.algolia.com/api/v1/search?query=redux',
    //     );
    //
    //     setData(result.data);
    // }, []);


    const classes = useStyles();
    const [basicInfo, setBasicInfo] = React.useState(data.basicInfo || {});
    const [dimensions, setDimensions] = React.useState(data.dimensions || {});
    const [productUrl, setProductUrl] = React.useState(data.productUrl || {});
    const [logistics, setLogistics] = React.useState(data.logistics || {});
    const [packaging, setPackaging] = React.useState(data.packaging || {});
    // const [setAttributes] = React.useState({})
    let formref  = React.createRef();


    const [attributes, setAttributes] = React.useState( {});


    // async function fetchUrl() {
    //     const response = await fetch("/attributeses");
    //     const json = await response.json();
    //     setAttributes(json._embedded.attributeses[0] || {});
    // }
    //
    // useEffect(() => {
    //     fetchUrl();
    // }, []);
    //

    useEffect(() => {
        axios
            .get("/attributeses")
            .then(result => setAttributes(result.data._embedded.attributeses[0]));
    }, []);

    function handleSaveProduct(event,errors) {

        formref.isFormValid(false).then((isValid) => {
            if (isValid) {

                basicInfo['salePrice']=roundUpPrice(basicInfo.salePrice,2);
                basicInfo['retailPrice']=roundUpPrice(basicInfo.retailPrice,2);


                let product = {
                    productId: basicInfo.barcode,
                    basicInfo: basicInfo,
                    dimensions: dimensions,
                    productUrl: productUrl,
                    logistics: logistics,
                    packaging: packaging,
                    attributes: attributes
                };
                let inventory = {
                    productId: basicInfo.barcode,
                    priceId: basicInfo.barcode,
                    stock: basicInfo.stock
                };
                let price = {
                    productId: basicInfo.barcode,
                    priceId: basicInfo.barcode,
                    prices: [{
                        salePrice: roundUpPrice(basicInfo.salePrice,2),
                        retailPrice: roundUpPrice(basicInfo.retailPrice,2)
                    }]
                };
                saveProduct("/products", basicInfo.barcode, product, props);
                saveInventory("/inventories", inventory)
                savePrice("/prices", price)
            }
        });

    }

    function handleUpdateProduct(event) {
        let product = {
            basicInfo: basicInfo,
            dimensions: dimensions,
            productUrl: productUrl,
            logistics: logistics,
            packaging: packaging,
            attributes: attributes
        };
        updateProduct(data._links.self.href, basicInfo.sku, product, props);
    }

    return (
        <Grid container>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={9}>
                <ValidatorForm
                    ref={(r) => { formref = r; }}
                    onError={errors => console.log(errors)}
                    onSubmit={handleSaveProduct}
                >
                    <Paper className={classes.mainContainer}>
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}>
                                Add New Product
                            </Typography>
                            <Button variant="outlined" component={Link} to="/products" color="primary"
                                    className={classes.button}>
                                <KeyboardArrowLeftIcon className={classes.rightIcon}/> Back
                            </Button>
                            {(function () {
                                switch (action) {
                                    case 'new':
                                        return <Button type={"submit"} variant="outlined" color="primary"
                                                       className={classes.button}>
                                            <DoneIcon className={classes.rightIcon}/>Save
                                        </Button>;
                                    case 'edit':
                                        return <Button variant="contained" onClick={handleUpdateProduct} color="primary"
                                                       className={classes.button}>
                                            <DoneIcon className={classes.rightIcon}/>Update
                                        </Button>;
                                    default:
                                        return null;
                                }
                            })()}

                        </Toolbar>
                        <div className={classes.root}>
                            <Stepper activeStep={activeStep} orientation="vertical">
                                {steps.map((label, index) => (
                                    <Step key={label}>
                                        {/*<StepLabel>{label}</StepLabel>*/}
                                        <StepButton onClick={handleStep(index)}>
                                            {label}
                                        </StepButton>
                                        <StepContent>
                                            {getStepContent(index)}
                                            <div className={classes.actionsContainer}>
                                                <div>
                                                    <Button
                                                        disabled={activeStep === 0}
                                                        onClick={handleBack}
                                                        className={classes.button}
                                                    >
                                                        Back
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handleNext}
                                                        className={classes.button}
                                                    >
                                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                    </Button>
                                                </div>
                                            </div>
                                        </StepContent>
                                    </Step>
                                ))}
                            </Stepper>
                            {activeStep === steps.length && (
                                <Paper square elevation={0} className={classes.resetContainer}>
                                    <Typography style={{paddingLeft: '10px'}}>All steps completed to save SKU
                                        !!</Typography>
                                    <Button onClick={handleReset} className={classes.button}>
                                        Reset
                                    </Button>
                                </Paper>
                            )}
                        </div>
                    </Paper>
                </ValidatorForm>
            </Grid>
        </Grid>
    );
}

function saveProduct(url, skuId, request, props) {
    post(url, request, (data) => {
        props.history.push("/products");
        toast.success('Saved Product:' + skuId + ' Info Successfully')
    }, function (response) {
        if (response.status == 409) { //CONFLICT
            toast.error('Product is not saved:  already exists')
        } else {
            toast.error('Product is not saved: Please try again')
        }
    })
}

function saveInventory(url, request) {
    post(url, request, (data) => {
        // toast.success('Saved SKU:' + skuId + ' Info Successfully')
    }, function (response) {

    })
}

function savePrice(url, request) {
    post(url, request, (data) => {
        // toast.success('Saved SKU:' + skuId + ' Info Successfully')
    }, function (response) {

    })
}

function updateProduct(url, skuId, request, props) {
    patch(url, request, (data) => {
        props.history.push("/products");
        toast.success('Saved Product:' + skuId + ' Info Successfully')
    }, function (response) {
        if (response.status == 409) { //CONFLICT
            toast.error('Product is not saved:  already exists')
        } else {
            toast.error('Product is not saved: Please try again')
        }
    })
}

function getSku(url) {
    get(url, (data) => {
        this.setState({product: data})
    }, function (response) {
        if (response.status === 409) { //CONFLICT
            toast.error('Application is not registered:  already exists')
        } else {
            toast.error('Application is not registered: Please try again')
        }
    })
};
