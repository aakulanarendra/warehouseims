import React from 'react'
import './Inventory.css'
import MaterialTable, {MTableToolbar} from 'material-table';
import {toast} from "react-toastify";
import {del, get, patch, post} from "../../utils/client";
import Button from "@material-ui/core/Button";
import {Link as ProductLink} from "react-router-dom";
import ExposurePlus1Icon from "@material-ui/icons/ExposurePlus1";
import ExposureNeg1Icon from "@material-ui/icons/ExposureNeg1";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import withStyles from "@material-ui/core/styles/withStyles";
import {SuccessThemeProvider, WarningThemeProvider} from "../../theme/muiTheme";
import Chip from "@material-ui/core/Chip";
import EditIcon from '@material-ui/icons/Edit';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Toolbar from "@material-ui/core/Toolbar";
import AddIcon from '@material-ui/icons/Add';
import Link from "@material-ui/core/Link";

const url = "/inventorylist";

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
    let rounder = Math.pow(10, precision);
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
                         size={"small"}
                         label={"$" + rowData.retailPrice + "- $" + rowData.salePrice}
                         color="primary"/>;

        case 'Pending':
            return <WarningThemeProvider>
                <Chip style={{minWidth: '100px'}}
                      onClick={e => self.handleClickOpen(e, rowData, "stockUpdate")}
                      onDelete={e => self.handleClickOpen(e, rowData, "stockUpdate")}
                      deleteIcon={<EditIcon/>}
                      variant="outlined"
                      size={"small"}
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
                      size={"small"}
                      label={rowData.stock}
                      color="primary"/>
            </SuccessThemeProvider>;

    }

}

function getInventoryByStatus(inventory, status) {
    switch (status) {
        case 'total':
            return inventory.reduce((total, data) => (total + data.stock), 0)
        case 'reserved':
            return inventory.reduce((total, data) => (total + (isNaN(data.reserved) ? 0 : data.reserved): total), 0)
        case 'issue':
            return inventory.reduce((total, data) => (data.status === status ? total + 1 : total), 0)
    }
}

class Inventory extends React.Component {
    constructor(props) {
        super(props);
        const {classes} = props;
        this.state = {
            open: false,
            dialogObj: {},
            classes: classes,
            columns: [
                {
                    field: 'skuImgUrls',
                    title: 'Product',
                    render: rowData => <img src={"images/bag.jpeg"} style={{height: 25}}/>
                },
                {
                    title: 'SKU', field: 'productId', render: rowData => <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                            props.history.push("/products/" + rowData.productId);
                        }}
                    >
                        {rowData.productId}
                    </Link>
                },
                {title: 'Product Name', field: 'productName'},
                // {title: 'Barcode', field: 'barcode'},
                {
                    title: 'Price',
                    field: 'price',
                    render: rowData => getStatusChip("price", rowData, this)
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

                            <ButtonGroup color="primary" size={"small"} aria-label="outlined primary button group">
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

        }
        this.setState({open: true, dialogObj: obj, action: action});
    }

    handleClose() {
        this.setState({open: false});
    }

    handleSave(event, data) {
        if (this.state.action === "priceUpdate") {

            let available = roundUpPrice(this.state.dialogObj.available,2);
            let quantity = roundUpPrice(this.state.dialogObj.quantity,2);

            this.setState({...this.state.dialogObj,...{'available':available,'quantity':quantity}});

            let priceUpdate = {
                priceId: data.productId,
                priceActivity: {
                    retailPrice: this.state.dialogObj.available,
                    salePrice: this.state.dialogObj.quantity
                }
            };

            let inventorydata = this.state.inventory;
            const index = inventorydata.indexOf(data);
            inventorydata[index]['retailPrice'] = this.state.dialogObj.available;
            inventorydata[index]['salePrice'] = this.state.dialogObj.quantity;
            this.updatePrice("/inventory/price", priceUpdate);
            this.setState({open: false, "inventory": inventorydata});

        } else {
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
            let inventory = {
                "inventoryId": "5d3f33d1c3550209924d5185",
                stock: stock
            };
            let inventorydata = this.state.inventory;
            const index = inventorydata.indexOf(data);
            inventorydata[index]['stock'] = stock;
            this.updateInventory("/inventories/" + data.inventoryId, inventory);
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
        const dialogObj = this.state.dialogObj;
        const classes = this.state.classes;
        return (
            <div>
                <Grid container>
                    <Grid className={classes.orderContainer} item xs={10}>
                        <MaterialTable
                            title="Inventory"
                            columns={this.state.columns}
                            data={this.state.inventory}
                            components={{
                                Toolbar: props => (
                                    <Toolbar style={{padding: 0, width: '100%', justifyContent: 'space-between'}}>
                                        <MTableToolbar {...props} />
                                        <Button component={ProductLink} to="/products/add" variant="outlined" color="primary">
                                            <AddIcon/> Add Product
                                        </Button>
                                    </Toolbar>

                                ),
                            }}
                            options={{
                                actionsColumnIndex: -1,
                                headerStyle: {
                                    backgroundColor: '#01579b',
                                    color: '#FFF'
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Box height="100%" className={classes.orderOverview}>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        classes={{secondary: classes.listItemText, primary: classes.primaryListItem}}
                                        primary="Sku Total"
                                        secondary={getInventoryByStatus(this.state.inventory, "total")}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        classes={{secondary: classes.listItemText, primary: classes.primaryListItem}}
                                        primary="Products Reserved"
                                        secondary={getInventoryByStatus(this.state.inventory, "reserved")}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        classes={{secondary: classes.listItemText, primary: classes.primaryListItem}}
                                        primary="Stock Issue"
                                        secondary={getInventoryByStatus(this.state.inventory, "issue")}/>
                                </ListItem>
                                {/*<ListItem>*/}
                                {/*    <ListItemText classes={{secondary: classes.listItemText, primary: classes.primaryListItem}}*/}
                                {/*                  primary="Cancelled" secondary={getInventoryByStatus(this.state.inventory, "Cancelled")}/>*/}
                                {/*</ListItem>*/}
                            </List>
                        </Box>
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
            toast.success('Saved SKU:' + skuId + ' Info Successfully')
        }, function (response) {
            if (response.status == 409) { //CONFLICT
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
        patch(url, request, (data) => {
            toast.success('Updated Inventory Successfully')
            // this.setState({inventory: data})
        }, function (response) {
            toast.error('Failed to Update Info')
        })
    };

    deleteInventory = (url, skuId) => {
        del(url, (data) => {
            toast.success('Deleted SKU:' + skuId + ' Successfully')
        }, function (response) {
            toast.error('Failed to Delete SKU:' + skuId)
        })
    };
}


export default withStyles(useStyles)(Inventory);