import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MaterialTable, {MTableToolbar} from "material-table";
import AddIcon from "@material-ui/icons/Add";
import Toolbar from "@material-ui/core/Toolbar";
import AddStore from "./AddStore";
import * as Constants from "../../../utils/constants";
import {get} from "../../../utils/client";


const dataUrl = Constants.STORE_LIST_URL;

export default function StoreList(props) {

    const [open, setOpen] = React.useState(false);

    function openAddModal() {
        setOpen(true);
    }

    const [state, setState] = React.useState({
        columns: [
            {title: 'Code', field: 'code'},
            {title: 'Name', field: 'name'},
            {title: 'Address', field: 'address'},
            {title: 'Phone Number', field: 'phoneNumber'},
            {title: 'City', field: 'city'},
            {title: 'State', field: 'state'},
            {title: 'Country', field: 'country'},
            {title: 'Currency', field: 'currency'}
        ],
        data: [],
    });

    useEffect(() => {
        get(dataUrl, (data) => {
            setState({...state, 'data': data})
        }, function (response) {

        })

    }, []);

    const updateData = (data) => {
        setState({...state, 'data': ([...state.data || [], data])})
    }

    return (
        <Grid item xs={12}>
            <MaterialTable
                title="Stores"
                data={state.data}
                columns={state.columns}
                components={{
                    Toolbar: props => (
                        <Toolbar style={{padding: '5px', width: '100%', justifyContent: 'space-between'}}>
                            <MTableToolbar {...props} />
                            <Button variant="outlined" color="primary" onClick={openAddModal}>
                                <AddIcon/> Add Store
                            </Button>
                        </Toolbar>
                    ),
                }}/>
            {open && <AddStore open={open} setOpen={setOpen} updateData={updateData}/>}
        </Grid>
    )
}