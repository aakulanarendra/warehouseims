import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {Link as RouterLink} from "react-router-dom";
import MaterialTable, {MTableToolbar} from "material-table";
import AddIcon from "@material-ui/icons/Add";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import AddBrand from "./AddBrand";
import * as Constants from "../../../utils/constants";
import {get} from "../../../utils/client";
import {useAppState} from "../../../context/AppContext";
import IconButton from "@material-ui/core/IconButton";


const dataUrl = Constants.BRAND_LIST_URL;

export default function BrandList(props) {

    const [open, setOpen] = React.useState(false);

    function openAddModal() {
        setOpen(true);
    }

    const [state, setState] = React.useState({
        columns: [
            {title: 'Code', field: 'code'},
            {title: 'Name', field: 'name'},
            // {title: 'Company', field: 'company'},
            {title: 'Brand Logo', field: 'imageUrl'}
        ],
        data: [],
    });

    useEffect(() => {
        get(dataUrl, (data) => {
            setState({...state, 'data': data._embedded.brands})
        }, function (response) {

        })

    }, []);

    const updateData = (data) => {
        setState({...state, 'data': ([...state.data||[], data])})
    }

    return (
        <Grid item xs={12}>
            <MaterialTable
                title="Brand"
                data={state.data}
                columns={state.columns}
                components={{
                    Toolbar: props => (
                        <Toolbar style={{padding: '5px', width: '100%', justifyContent: 'space-between'}}>
                            <MTableToolbar {...props} />
                            <IconButton color="primary" onClick={() => openAddModal()}>
                                <AddIcon/>
                            </IconButton>
                        </Toolbar>
                    ),
                }}/>
            {open && <AddBrand open={open} setOpen={setOpen} updateData={updateData}/>}
        </Grid>
    )
}