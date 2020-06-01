import React, {useEffect} from 'react'
import Grid from "@material-ui/core/Grid/index";
import Moment from "react-moment/dist/index";
import Toolbar from "@material-ui/core/Toolbar/index";
import Button from "@material-ui/core/Button/index";
import AddIcon from "@material-ui/icons/Add";
import {Link as RouterLink} from "react-router-dom";
import Link from "@material-ui/core/Link/index";
import AddRole from "./AddRole";
import {ROLES_LIST} from "../../../utils/constants";
import {get} from "../../../utils/client";
import MaterialTable, {MTableToolbar} from "material-table";

const dataUrl = ROLES_LIST;

export default function Roles() {

    const [open, setOpen] = React.useState(false);

    function openAddModal() {
        setOpen(true);
    }

    const [state, setState] = React.useState({
        columns: [
            {
                title: 'Role',
                render: rowData => <Link component={RouterLink}
                                         to={`/app/settings/roles/${rowData.id}`}>{rowData.role}</Link>
            },
            {
                title: 'Description',
                field: 'roleDesc'
            },
            {
                title: 'Created',
                field: 'createdOn',
                render: rowData => <Moment format="MMMM Do YYYY h:mm:ss a">{rowData.createdOn}</Moment>
            }
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
    };

    return (
        <Grid item xs={12}>
            <MaterialTable
                title="Roles"
                data={state.data}
                columns={state.columns}
                components={{
                    Toolbar: props => (
                        <Toolbar style={{padding: '5px', width: '100%', justifyContent: 'space-between'}}>
                            <MTableToolbar {...props} />
                            <Button variant="outlined" color="primary" onClick={openAddModal}>
                                <AddIcon/> Add Role
                            </Button>
                        </Toolbar>
                    ),
                }}/>
            {open && <AddRole open={open} setOpen={setOpen} updateData={updateData}/>}
        </Grid>
    )
}