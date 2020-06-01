import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import Grid from "@material-ui/core/Grid";
import * as Constants from "../../utils/constants";
import { del, get } from "../../utils/client";
import TableToolbar from "../../components/TableToolbar/TableToolbar";
import { Image } from "cloudinary-react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import { useSnackbar } from "notistack";

const productList = Constants.PRODUCT_LIST_URL;
const productDeleteUrl = Constants.PRODUCT_DELETE;


export default function ProductList(props) {

    const [state, setState] = React.useState({
        columns: [
            {
                field: 'basicInfo.imgUrl',
                title: 'Product',
                render: rowData => <Image publicId={rowData.basicInfo&&rowData.basicInfo.imageUrls[0]} width="80" height="50"/>

                // render: rowData => <div>
                //
                //
                //     {(rowData.basicInfo&&rowData.basicInfo.imageUrls||[]).map((imageUrl) => {
                //         return <Image publicId={imageUrl} width="50"/>
                //     })
                //     }</div>
            },
            {title: 'Barcode',
                field: 'basicInfo.barcode',
                render:rowData=> <Link component={RouterLink} to={`product/${rowData.basicInfo.barcode}`}>{rowData.basicInfo.barcode}</Link>
            },
            {title: 'Product Name', field: 'basicInfo.productName'},
            {title: 'Price', field: 'basicInfo.salePrice', render: rowData => <span>{rowData.basicInfo&&rowData.basicInfo.salePrice}$</span>},
            {title: 'Product Inventory', field: 'basicInfo.stock'},
        ],
        data: [],
    });

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {

    }, []);


    const handleEdit = (rowData) => {
        props.history.push(`product/${rowData.basicInfo.barcode}`);
    };

    const handleDelete = (rowData) => {
        del(`${productDeleteUrl}${rowData.basicInfo.barcode}`, (res) => {
            const indexToRemove = state.data.findIndex(x => x.basicInfo.barcode === rowData.basicInfo.barcode);
            state.data.splice(indexToRemove,1)
            setState({...state, 'data': state.data});
            enqueueSnackbar(`Deleted Product Successfully`,{
                variant: 'success'
            })
        }, function (response) {
            enqueueSnackbar('Failed to delere product: Please try again', {
                variant: 'error'
            })
        })
    };

    useEffect(() => {
        const fetchProducts = () => {
            return get(productList, (data) => {
                setState({...state, 'data': data._embedded.products})
            }, (error) => {

            })
        };
        fetchProducts();
    }, []);

    return (
        <Grid item xs={12}>
            <MaterialTable
                title="Product"
                data={state.data}
                columns={state.columns}
                options={{actionsColumnIndex:-1}}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Product',
                        onClick: (event, rowData) => handleEdit(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete Product',
                        onClick: (event, rowData) => handleDelete(rowData)
                    }
                ]}
                components={{
                    Toolbar: (props) => <TableToolbar addLabel="Add Product" to="/app/products/add" {...props}/>
                }}/>

        </Grid>
    )
}