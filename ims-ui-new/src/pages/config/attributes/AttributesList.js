import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import MaterialTable, {MTableToolbar} from "material-table";
import AddIcon from "@material-ui/icons/Add";
import Toolbar from "@material-ui/core/Toolbar";

import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import * as Constants from "../../../utils/constants";
import {get} from "../../../utils/client";
import AddAttribute from "./AddAttribute";


const dataUrl = Constants.ATTRIBUTE_LIST_URL;

export default function AttributesList(props) {

    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState('colour');

    const openAddModal = (type) => {
        setType(type);
        setOpen(true);
    }

    const [state, setState] = React.useState({
        colourColumns: [
            {title: 'Colour Name', field: 'name'},
            {title: 'Colour Code', field: 'colourCode', render:rowData => <Chip style={{border:`1px solid ${rowData.colourCode}`}}
                    avatar={<Avatar style={{backgroundColor:rowData.colourCode,border:`1px solid ${rowData.colourCode}`}} />}
                    label={rowData.colourCode}
                    variant="outlined"
                />},
        ],
        sizeColumns: [
            {title: 'Size Name', field: 'name'},
            {title: 'Size Code', field: 'sizeCode'},
        ],
        data: {},
    });

    useEffect(() => {
        get(dataUrl, (data) => {
            setState({...state, 'data': data})
        }, function (response) {

        })

    }, []);

    const updateData = (data) => {
        let updatedData;
        if (type === 'colour') {
            const colours = [...state.data.colours || [], data]
            updatedData = {...state.data, 'colours': colours}
        } else {
            const sizes = [...state.data.sizes || [], data]
            updatedData = {...state.data, 'sizes': sizes}
        }
        setState({...state, 'data': updatedData})
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <MaterialTable
                    title="Colours"
                    data={state.data.colours}
                    columns={state.colourColumns}
                    components={{
                        Toolbar: props => (
                            <Toolbar style={{padding: '5px', width: '100%', justifyContent: 'space-between'}}>
                                <MTableToolbar {...props} />
                                <IconButton color="primary" onClick={() => openAddModal('colour')}>
                                    <AddIcon/>
                                </IconButton>
                            </Toolbar>
                        ),
                    }}/>
            </Grid>
            <Grid item xs={6}>
                <MaterialTable
                    title="Sizes"
                    data={state.data.sizes}
                    columns={state.sizeColumns}
                    components={{
                        Toolbar: props => (
                            <Toolbar style={{padding: '5px', width: '100%', justifyContent: 'space-between'}}>
                                <MTableToolbar {...props} />

                                <IconButton color="primary" onClick={() => openAddModal('size')}>
                                    <AddIcon/>
                                </IconButton>
                            </Toolbar>
                        ),
                    }}/>
            </Grid>
            {open && <AddAttribute open={open} setOpen={setOpen} updateData={updateData} type={type}/>}
        </Grid>

    )
}