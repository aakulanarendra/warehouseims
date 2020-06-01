import React, {useEffect, useState} from "react";
import {Drawer, IconButton, List} from "@material-ui/core";
import {
    ArrowBack as ArrowBackIcon,
    BorderAll as TableIcon,
    Home as HomeIcon,
    People as PeopleIcon,
    Place as PlaceIcon,
    ShoppingCart as ShoppingCartIcon, Store
} from "@material-ui/icons";
import {useTheme} from "@material-ui/styles";
import {withRouter} from "react-router-dom";
import classNames from "classnames";
// styles
import useStyles from "./styles";
// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";
// context
import {toggleSidebar, useLayoutDispatch, useLayoutState,} from "../../context/LayoutContext";
import {useUserState} from "../../context/UserContext";

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
    {id: 5, type: "divider",roles:[]},

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

function Sidebar({location}) {
    const classes = useStyles();
    const theme = useTheme();

    // global
    const {isSidebarOpened} = useLayoutState();
    const layoutDispatch = useLayoutDispatch();
    const {userRole,pages} = useUserState();

    // local
    const [isPermanent, setPermanent] = useState(true);

    useEffect(function () {
        window.addEventListener("resize", handleWindowWidthChange);
        handleWindowWidthChange();
        return function cleanup() {
            window.removeEventListener("resize", handleWindowWidthChange);
        };
    });

    return (
        <Drawer
            variant={isPermanent ? "persistent" : "temporary"}
            className={classNames(classes.drawer, {
                [classes.drawerOpen]: isSidebarOpened,
                [classes.drawerClose]: !isSidebarOpened,
            })}
            classes={{
                paper: classNames({
                    [classes.drawerOpen]: isSidebarOpened,
                    [classes.drawerClose]: !isSidebarOpened,
                }),
            }}
            open={isSidebarOpened}
        >
            <div className={classes.toolbar}/>
            <div className={classes.mobileBackButton}>
                <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
                    <ArrowBackIcon
                        classes={{
                            root: classNames(classes.headerIcon, classes.headerIconCollapse),
                        }}
                    />
                </IconButton>
            </div>
            <List className={classes.sidebarList}>
                {pages.map(link => {
                        return (
                                <SidebarLink
                                    key={link.id}
                                    location={location}
                                    isSidebarOpened={isSidebarOpened}
                                    {...link}
                                />
                        )
                    }
                )}
            </List>
        </Drawer>
    );

    // ##################################################################
    function handleWindowWidthChange() {
        const windowWidth = window.innerWidth;
        const breakpointWidth = theme.breakpoints.values.md;
        const isSmallScreen = windowWidth < breakpointWidth;

        if (isSmallScreen && isPermanent) {
            setPermanent(false);
        } else if (!isSmallScreen && !isPermanent) {
            setPermanent(true);
        }
    }
}

export default withRouter(Sidebar);
