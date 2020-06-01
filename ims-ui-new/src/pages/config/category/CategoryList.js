import React, {useEffect} from 'react';
import * as Constants from "../../../utils/constants";
import {get} from "../../../utils/client";
import Grid from "@material-ui/core/Grid";
import {categoryStyles} from "./CategoryStyle";
import {Link as RouterLink} from "react-router-dom";
import MaterialTable, {MTableToolbar} from "material-table";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import AddCategory from "./AddCategory";
import {sortBy} from "lodash";
import AddIcon from "@material-ui/icons/Add";
import {AddCircleOutline} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import {Image} from "cloudinary-react";


const categoryList = Constants.CATEGORY_LIST_URL;

function getStores(stores) {
    let storeList = "";
    stores || [].map((store, index) => {
        storeList = store.code + ","
    });
    return storeList.substring(0, storeList.length - 1);

}

export default function CategoryList(props) {

    const classes = categoryStyles();

    const [open, setOpen] = React.useState(false);

    function openAddCategory() {
        setOpen(true);
    }

    const [state, setState] = React.useState({
        columns: [
            {
                title: 'Code',
                field: 'categoryCode',
                render: rowData => <Link component={RouterLink}
                                         to={`category/${rowData.categoryCode}`}>{rowData.categoryCode}</Link>
            },
            {
                title: 'Image',
                render: rowData => <div>
                    {rowData.imageUrls.map((imageUrl) => {
                        return <Image publicId={`${imageUrl}.jpg`} width="50"/>
                    })
                    }</div>
            },
            {title: 'Name', field: 'categoryName'},
            {title: 'Description', field: 'description'},
            {title: 'Search Terms', field: 'searchTerms'},

        ],
        data: [],
    });

    const updateData = (data) => {
        data = sortBy([...state['data'] || [], data],'createdOn').reverse();
        setState({...state, ['data']: data})
    };

    useEffect(() => {
        get(categoryList, (data) => {
            data = sortBy(data,'createdOn').reverse();
            setState({...state, ['data']: data})
        }, function (response) {

        })

    }, []);


    return (
        <Grid item xs={12}>
            <MaterialTable
                title={"Category"}
                data={state.data}
                columns={state.columns}
                components={{
                    Toolbar: props => (
                        <Toolbar style={{padding: '5px', width: '100%', justifyContent: 'space-between'}}>
                            <MTableToolbar {...props} />
                            <IconButton color="primary" onClick={openAddCategory} aria-label="Add">
                                <AddIcon/>
                            </IconButton>
                        </Toolbar>

                    ),
                }}/>
            {open && <AddCategory open={open} setOpen={setOpen} updateData={updateData}/>}
        </Grid>
    )
}