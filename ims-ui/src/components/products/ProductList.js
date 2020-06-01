import React from 'react'
import MaterialTable, {MTableToolbar} from 'material-table';
import {toast} from "react-toastify";
import {del, get, patch, post} from "../../utils/client";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import AddIcon from '@material-ui/icons/Add';
import {Link} from "react-router-dom";
import * as Constants from "../../utils/constants";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {productStyles} from "./ProductStyle";
import withStyles from "@material-ui/core/styles/withStyles";

const url = Constants.PRODUCTS_URL;

const useStyles = {
    productOverview: {
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
    productContainer: {
        padding: '24px',
    }
};


function getInventoryByStatus(inventory, status) {
    switch (status) {
        case 'total':
            return inventory.length;
        case 'reserved':
            return inventory.reduce((total, data) => (total + (isNaN(data.reserved) ? 0 : data.reserved): total), 0);
        case 'issue':
            return inventory.reduce((total, data) => (data.status === status ? total + 1 : total), 0);
    }
}


class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    field: 'basicInfo.imgUrl',
                    title: 'Product',
                    render: rowData => <img src={"images/bag.jpeg"} style={{height: 25}}/>
                },
                {title: 'Barcode', field: 'basicInfo.barcode'},
                {title: 'Product Name', field: 'basicInfo.productName'},
                {title: 'Price', field: 'basicInfo.salePrice', render: rowData => <span>{rowData.basicInfo.salePrice}$</span>},
                {title: 'Product Inventory', field: 'basicInfo.stock'}
            ],
            inventory: []
        };
    }


    componentDidMount() {
        this.getInventory(url)
    }


    render() {
        const {classes} = this.props;
        return (
            <Grid container>
                <Grid className={classes.productContainer} item xs={10}>
                    <MaterialTable
                        title="Products"
                        columns={this.state.columns}
                        data={this.state.inventory}
                        components={{
                            Toolbar: props => (
                                <Toolbar style={{padding: 0, width: '100%', justifyContent: 'space-between'}}>
                                    <MTableToolbar {...props} />
                                    <Button component={Link} to="/products/add/" variant="outlined" color="primary">
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
                        actions={[
                            {
                                icon: 'search',
                                tooltip: 'View Product',
                                onClick: (event, rowData) => {
                                    this.props.history.push("/products/" + rowData.basicInfo.sku, {
                                        data: rowData,
                                        action: 'view'
                                    });
                                }
                            },
                            {
                                icon: 'edit',
                                tooltip: 'Edit Product',
                                onClick: (event, rowData) => {
                                    this.props.history.push("/products/" + rowData.basicInfo.sku, {
                                        data: rowData,
                                        action: 'edit'
                                    });
                                }
                            },

                        ]}
                        editable={{
                            onRowDelete: oldData =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        {
                                            let data = this.state.inventory;
                                            const index = data.indexOf(oldData);
                                            data.splice(index, 1);
                                            this.deleteInventory(oldData._links.self.href, oldData.basicInfo.sku);
                                            this.setState({data}, () => resolve());
                                        }
                                        resolve()
                                    }, 1000)
                                }),
                        }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Box height="100%" className={classes.productOverview}>
                        <List>
                            <ListItem>
                                <ListItemText
                                    classes={{secondary: classes.listItemText, primary: classes.primaryListItem}}
                                    primary="Products Total"
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
        )
    }


    getInventory = (url) => {
        get(url, (data) => {
            this.setState({inventory: data._embedded.products})
        }, function (response) {
            if (response.status == 409) { //CONFLICT
                toast.error('Application is not registered:  already exists')
            } else {
                toast.error('Application is not registered: Please try again')
            }
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

    updateInventory = (url, request, skuId) => {
        patch(url, request, (data) => {
            toast.success('Updated SKU:' + skuId + ' Info Successfully')
            // this.setState({inventory: data})
        }, function (response) {
            toast.error('Failed to Update SKU:' + skuId + ' Info')
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

export default withStyles(useStyles)(ProductList);