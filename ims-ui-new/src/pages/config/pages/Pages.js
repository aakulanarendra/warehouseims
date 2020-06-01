import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {
    BorderAll as TableIcon,
    People as PeopleIcon,
    Place as PlaceIcon,
    ShoppingCart as ShoppingCartIcon,
    Store
} from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";
import * as Constants from "../../../utils/constants";
import {get} from "../../../utils/client";
import Dot from "../../../components/Sidebar/components/Dot";
import PageLink from "./PageLink";
import AddPage from "./AddPage";

const structure = [
    {
        id: 0,
        label: "Dashboard",
        link: "/app/dashboard",
        icon: "home",
        roles: ['superadmin', 'admin', 'agent', 'user']
    },
    {
        id: 1,
        label: "Customers",
        link: "/app/customers",
        icon: <PeopleIcon/>,
        roles: ['superadmin', 'admin'],

    },
    {
        id: 11,
        label: "Roles",
        link: "/app/roles",
        icon: <PeopleIcon/>,
        roles: ['superadmin', 'admin'],

    },
    {
        id: 2,
        label: "Products",
        link: "/app/products",
        icon: <TableIcon/>,
        roles: ['superadmin', 'admin'],
    },
    {
        id: 3,
        label: "Inventory",
        link: "/app/inventory",
        icon: <PlaceIcon/>,
        roles: ['superadmin', 'admin'],
    },
    {
        id: 4,
        label: "Orders",
        link: "/app/orders",
        icon: <ShoppingCartIcon/>,
        roles: ['superadmin', 'admin'],
    },
    {id: 5, type: "divider", roles: []},

    {
        id: 6,
        label: "Store",
        link: "/app/store",
        icon: <Store/>,
        roles: ['superadmin', 'admin', 'agent'],
    },
    {
        id: 7,
        label: "Mobile",
        link: "/app/mobilestore",
        icon: <Store/>,
        roles: ['superadmin', 'admin', 'agent'],
    },
    {id: 8, type: "divider", roles: ['superadmin', 'admin']},
    {
        id: 9,
        label: "My recent",
        link: "",
        icon: <Dot size="large" color="warning"/>,
        roles: ['superadmin', 'admin'],
    },
    {
        id: 10,
        label: "Starred",
        link: "",
        icon: <Dot size="large" color="primary"/>,
        roles: ['superadmin', 'admin'],
    },
];

const dataUrl = Constants.PAGES_LIST;

export default function Pages(props) {

    const [open, setOpen] = React.useState(false);
    const [pageMenu, setPageMenu] = React.useState([]);

    function openAddModal() {
        setOpen(true);
    }


    useEffect(() => {
        get(dataUrl, (data) => {
            setPageMenu(data)
        }, function (response) {

        })

    }, []);

    const updateData = (data) => {
        setPageMenu([...pageMenu,data])
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={9}>
                <Paper style={{padding: '10px'}}>
                <AddPage key="page" updateData={updateData}/>
                </Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper>
                    {pageMenu.map(link => {

                            return (
                                <PageLink
                                    key={link.id}
                                    isSidebarOpened
                                    {...link}
                                />
                            )
                        }
                    )}
                </Paper>
            </Grid>
        </Grid>
)
}