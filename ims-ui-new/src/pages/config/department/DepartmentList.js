import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MaterialTable, {MTableToolbar} from "material-table";
import AddIcon from "@material-ui/icons/Add";
import Toolbar from "@material-ui/core/Toolbar";
import AddDepartment from "./AddDepartment";
import * as Constants from "../../../utils/constants";
import {get} from "../../../utils/client";


const dataUrl = Constants.DEPARTMENT_LIST_URL;

export default function DepartmentList(props) {

    const [open, setOpen] = React.useState(false);

    function openAddModal() {
        setOpen(true);
    }

    const [state, setState] = React.useState({
        columns: [
            {title: 'Department Code', field: 'departmentCode'},
            {title: 'Department Name', field: 'departmentName'},
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
                title="Departments"
                data={state.data}
                columns={state.columns}
                components={{
                    Toolbar: props => (
                        <Toolbar style={{padding: '5px', width: '100%', justifyContent: 'space-between'}}>
                            <MTableToolbar {...props} />
                            <Button variant="outlined" color="primary" onClick={openAddModal}>
                                <AddIcon/> Add Department
                            </Button>
                        </Toolbar>
                    ),
                }}/>
            {open && <AddDepartment open={open} setOpen={setOpen} updateData={updateData}/>}
        </Grid>
    )
}