import React from 'react'
import MaterialTable from 'material-table';
import {toast} from "react-toastify";
import Button from "@material-ui/core/Button";
import ExposurePlus1Icon from "@material-ui/icons/ExposurePlus1";
import ExposureNeg1Icon from "@material-ui/icons/ExposureNeg1";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import withStyles from "@material-ui/core/styles/withStyles";
import Chip from "@material-ui/core/Chip";
import EditIcon from '@material-ui/icons/Edit';
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Link from "@material-ui/core/Link";
import { Image } from "cloudinary-react";
import {SuccessThemeProvider, WarningThemeProvider} from "../../themes/customThemes";
import {del, get, patch, post} from "../../utils/client";
import TableToolbar from "../../components/TableToolbar/TableToolbar";
import * as Constants from "../../utils/constants";

const url = Constants.PRODUCT_INVENTORY;
const priceUpdate = Constants.PRODUCT_PRICE_UPDATE;
const taxUpdate = Constants.PRODUCT_TAX_UPDATE;
const stockUpdate = Constants.PRODUCT_STOCK_UPDATE;

const useStyles = {
    margin: {
        margin: '0 2px',
    },
    extendedIcon: {
        marginRight: 1,
    },
    orderOverview: {
        backgroundColor: 'rgba(133,175,255,0.17)',
        padding: '20px',
        minHeight: '90vH',
        borderLeft: '1px solid lightgrey'
    },
    listItemText: {
        fontSize: '2.1em',
    },
    primaryListItem: {
        fontSize: '0.85em',
    },
    orderContainer: {
        padding: '24px',
    }
};

function roundUpPrice(price,precision){
    const rounder = Math.pow(10, precision);
    return (Math.round(price * rounder) / rounder).toFixed(precision)
}

function getStatusChip(chipType, rowData, self) {
    switch (chipType) {
        case 'price':
            return <Chip style={{minWidth: '100px'}}
                         onClick={e => self.handleClickOpen(e, rowData, "priceUpdate")}
                         onDelete={e => self.handleClickOpen(e, rowData, "priceUpdate")}
                         deleteIcon={<EditIcon/>}
                         variant="outlined"
                         size="small"
                         label={`$${  rowData.retailPrice  }- $${  rowData.salePrice}`}
                         color="primary"/>;
        case 'tax':
            return <Chip style={{minWidth: '100px'}}
                         onClick={e => self.handleClickOpen(e, rowData, "taxUpdate")}
                         onDelete={e => self.handleClickOpen(e, rowData, "taxUpdate")}
                         deleteIcon={<EditIcon/>}
                         variant="outlined"
                         size="small"
                         label={`${ rowData.tax}%`}
                         color="primary"/>;

        case 'Pending':
            return <WarningThemeProvider>
                <Chip style={{minWidth: '100px'}}
                      onClick={e => self.handleClickOpen(e, rowData, "stockUpdate")}
                      onDelete={e => self.handleClickOpen(e, rowData, "stockUpdate")}
                      deleteIcon={<EditIcon/>}
                      variant="outlined"
                      size="small"
                      label={rowData.stock}
                      color="primary"/>
            </WarningThemeProvider>;
        default:
            return <SuccessThemeProvider>
                <Chip style={{minWidth: '100px'}}
                      onClick={e => self.handleClickOpen(e, rowData, "stockUpdate")}
                      onDelete={e => self.handleClickOpen(e, rowData, "stockUpdate")}
                      deleteIcon={<EditIcon/>}
                      variant="outlined"
                      size="small"
                      label={rowData.stock}
                      color="primary"/>
            </SuccessThemeProvider>;

    }

}

class Inventory extends React.Component {
    constructor(props) {
        super(props);
        const {classes} = props;
        this.state = {
            open: false,
            dialogObj: {},
            classes,
            columns: [
                {
                    field: 'skuImgUrls',
                    title: 'Product',
                    render: rowData => <Image publicId={rowData.skuImageUrl&&rowData.skuImageUrl[0]} width={"80"} height="50" onError={() => {this.img.element.src='/images/update.png'}} ref={(img) => { this.img = img}}/>
                },
                {title: 'Barcode', field: 'productId'},
                // {
                    // title: 'SKU', field: 'productId', render: rowData => <Link
                    //     component="button"
                    //     variant="body2"
                    //     onClick={() => {
                    //         props.history.push(`/app/products/${  rowData.productId}`);
                    //     }}
                    // >
                    //     {rowData.productId}
                    // </Link>
                // },
                {title: 'Product Name', field: 'productName'},
                // {title: 'Barcode', field: 'barcode'},
                {
                    title: 'Price',
                    field: 'price',
                    render: rowData => getStatusChip("price", rowData, this)
                },
                {
                    title: 'Tax',
                    field: 'tax',
                    render: rowData => getStatusChip("tax", rowData, this)
                },
                {
                    title: 'Stock',
                    field: 'stock',
                    render: rowData => getStatusChip("stock", rowData, this)
                },
                {
                    title: 'Inventory Actions', field: 'brand',
                    width: '30%',
                    render: rowData =>
                        <div>

                            <ButtonGroup color="primary" size="small" aria-label="outlined primary button group">
                                <Button
                                    onClick={e => this.handleClickOpen(e, rowData, "receiveOne")}>
                                    <ExposurePlus1Icon/>
                                </Button>
                                <Button
                                    onClick={e => this.handleClickOpen(e, rowData, "issueOne")}>
                                    <ExposureNeg1Icon/>
                                </Button>
                                <Button
                                    onClick={e => this.handleClickOpen(e, rowData, "receive")}>
                                    Receive
                                </Button>
                                <Button
                                    onClick={e => this.handleClickOpen(e, rowData, "issue")}>
                                    Issue
                                </Button>
                            </ButtonGroup>


                        </div>
                },
            ],
            inventory: []
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClickOpen(e, rowData, action) {
        e.preventDefault();
        let obj = {};
        switch (action) {
            case "issue":
                obj = {
                    title: 'Issue from inventory',
                    available: rowData.stock,
                    disabled: false,
                    label1: 'Available',
                    label2: 'Quantity',
                    data: rowData,
                    availableDisabled: true
                };
                break;
            case "receive":
                obj = {
                    title: 'Receive to inventory',
                    available: rowData.stock,
                    disabled: false,
                    label1: 'Available',
                    label2: 'Quantity',
                    data: rowData,
                    availableDisabled: true

                };
                break;
            case "issueOne":
                obj = {
                    title: 'Issue 1 piece from inventory',
                    available: rowData.stock,
                    disabled: true,
                    quantity: -1,
                    data: rowData,
                    label1: 'Available',
                    label2: 'Quantity',
                    updatedQuantity: rowData.stock - 1,
                    availableDisabled: true

                };
                break;
            case "receiveOne":
                obj = {
                    title: 'Receive 1 piece to inventory',
                    available: rowData.stock,
                    disabled: true,
                    quantity: +1,
                    data: rowData,
                    label1: 'Available',
                    label2: 'Quantity',
                    updatedQuantity: rowData.stock + 1,
                    availableDisabled: true
                };
                break;
            case "stockUpdate":
                obj = {
                    title: 'Update inventory',
                    available: rowData.stock,
                    disabled: false,
                    data: rowData,
                    label1: 'Available',
                    label2: 'Quantity',
                    availableDisabled: true

                };
                break;
            case "priceUpdate":
                obj = {
                    title: 'Update Price',
                    available: rowData.retailPrice,
                    quantity: rowData.salePrice,
                    disabled: false,
                    data: rowData,
                    label1: 'Retail Price',
                    label2: 'Sale Price',
                    availableDisabled: false
                };
                break;
            case "taxUpdate":
                obj = {
                    title: 'Update Tax',
                    available: rowData.tax,
                    disabled: false,
                    data: rowData,
                    label1: 'Tax',
                    label2: 'New Tax',
                    availableDisabled: true
                };
                break;
            default:
                obj ={

                }

        }
        this.setState({open: true, dialogObj: obj, action});
    }

    handleClose() {
        this.setState({open: false});
    }

    handleSave(event, data) {
        if (this.state.action === "priceUpdate") {

            this.state.dialogObj.available = roundUpPrice(this.state.dialogObj.available, 2);
            this.state.dialogObj.quantity = roundUpPrice(this.state.dialogObj.quantity, 2);

            const priceUpdate = {
                priceId: data.productId,
                priceActivity: {
                    retailPrice: this.state.dialogObj.available,
                    salePrice: this.state.dialogObj.quantity
                }
            };

            const inventorydata = this.state.inventory;
            const index = inventorydata.indexOf(data);
            inventorydata[index].retailPrice = this.state.dialogObj.available;
            inventorydata[index].salePrice = this.state.dialogObj.quantity;
            this.updatePrice(priceUpdate, priceUpdate);
            this.setState({open: false, "inventory": inventorydata});

        } else if (this.state.action === "taxUpdate") {

                this.state.dialogObj.available = roundUpPrice(this.state.dialogObj.available,2);
                this.state.dialogObj.quantity = roundUpPrice(this.state.dialogObj.quantity,2);

                const taxUpdateReq = {
                    barcode: data.productId,
                    tax: this.state.dialogObj.quantity
                };

                const inventorydata = this.state.inventory;
                const index = inventorydata.indexOf(data);
                inventorydata[index].tax = this.state.dialogObj.quantity;
                this.updatePrice(taxUpdate, taxUpdateReq);
                this.setState({open: false, "inventory": inventorydata});

        }else {
            let stock = 0;
            if (this.state.action === "issueOne" || this.state.action === "receiveOne") {
                stock = this.state.dialogObj.updatedQuantity
            } else if (this.state.action === "receive") {
                stock = parseInt(data.stock) + parseInt(this.state.dialogObj.quantity);
            } else if (this.state.action === "issue") {
                stock = parseInt(data.stock) - parseInt(this.state.dialogObj.quantity);
            } else {
                stock = parseInt(this.state.dialogObj.quantity);
            }
            const inventory = {
                "barcode": data.productId,
                "stock":stock
            };
            const inventorydata = this.state.inventory;
            const index = inventorydata.indexOf(data);
            inventorydata[index].stock = stock;
            this.updateInventory(stockUpdate, inventory);
            this.setState({open: false, "inventory": inventorydata});
        }
    }

    componentDidMount() {
        this.getInventory(url)
    }

    handleChange(event, name) {
        this.state.dialogObj[name] = event.target.value;
        this.setState(this.state.dialogObj);
    };

    render() {
        const {dialogObj} = this.state;
        return (
            <div>
                <Grid container>
                    <Grid item xs={12}>
                        <MaterialTable
                            title="Inventory"
                            columns={this.state.columns}
                            data={this.state.inventory}
                            components={{
                                Toolbar: (props) => <TableToolbar addLabel="Add Product" to="/app/products/add" {...props}/>
                            }}
                            options={{
                                actionsColumnIndex: -1
                            }}
                        />
                    </Grid>
                </Grid>
                <div>
                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">{dialogObj.title}</DialogTitle>
                        <DialogContent>

                            <TextField
                                autoFocus
                                margin="dense"
                                id="available"
                                label={dialogObj.label1}
                                type="email"
                                disabled={dialogObj.availableDisabled}
                                fullWidth
                                value={dialogObj.available}
                                onChange={(e) => this.handleChange(e, 'available')}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="Quantity"
                                label={dialogObj.label2}
                                type="email"
                                fullWidth
                                disabled={dialogObj.disabled}
                                value={dialogObj.quantity}
                                onChange={(e) => this.handleChange(e, 'quantity')}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={e => this.handleSave(e, dialogObj.data)} color="primary">
                                Update
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        )
    }

    getInventory = (url) => {
        get(url, (data) => {
            this.setState({inventory: data})
        }, function (response) {
        })
    };


    saveInventory = (url, skuId, request) => {
        post(url, request, (data) => {
            toast.success(`Saved SKU:${  skuId  } Info Successfully`)
        }, function (response) {
            if (response.status === 409) { // CONFLICT
                toast.error('Application is not registered:  already exists')
            } else {
                toast.error('Application is not registered: Please try again')
            }
        })
    };

    updatePrice = (url, request) => {
        post(url, request, (data) => {
        }, function (response) {
        })
    };


    updateInventory = (url, request) => {
        post(url, request, (data) => {
            toast.success('Updated Inventory Successfully')
            // this.setState({inventory: data})
        }, function (response) {
            toast.error('Failed to Update Info')
        })
    };

    deleteInventory = (url, skuId) => {
        del(url, (data) => {
            toast.success(`Deleted SKU:${  skuId  } Successfully`)
        }, function (response) {
            toast.error(`Failed to Delete SKU:${  skuId}`)
        })
    };
}


export default withStyles(useStyles)(Inventory);