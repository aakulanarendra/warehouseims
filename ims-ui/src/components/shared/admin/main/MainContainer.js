import React from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles/index';
import Drawer from '@material-ui/core/Drawer/index';
import AppBar from '@material-ui/core/AppBar/index';
import Toolbar from '@material-ui/core/Toolbar/index';
import List from '@material-ui/core/List/index';
import CssBaseline from '@material-ui/core/CssBaseline/index';
import Typography from '@material-ui/core/Typography/index';
import Divider from '@material-ui/core/Divider/index';
import IconButton from '@material-ui/core/IconButton/index';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem/index';
import ListItemIcon from '@material-ui/core/ListItemIcon/index';
import ListItemText from '@material-ui/core/ListItemText/index';
import {Navigation} from "../navigation";
import {Assessment, Dashboard, People, Receipt, ShoppingCart, Store} from "@material-ui/icons/index";
import {Link} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import {BorderAll, Place} from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: 'white',
        borderBottom: '1px solid lightgrey',
        color: '#18202c'
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        // padding: theme.spacing(3),
        width: '100%',
        // height: 'calc(100% - 56px)'
    },
    divider:{
        backgroundColor: 'rgba(255, 255, 255, 0.7)'
    }
}));

export default function AdminMainContainer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [stores, setStores] = React.useState(true);

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    return (
        stores? (<div className={classes.root}>
                    <CssBaseline/>
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, {
                                    [classes.hide]: open,
                                })}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" noWrap>
                                IMS
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        className={clsx(classes.drawer, {
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        })}
                        classes={{
                            paper: clsx({
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open,
                            }, classes.paper),
                            primary: clsx(classes.listItemIcon)
                        }}
                        open={open}
                    >
                        <div className={classes.toolbar}>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                            </IconButton>
                        </div>
                        <Divider/>
                        <List>

                            <ListItem button key="dashboard" component={Link} to="/">
                                <ListItemIcon className={classes.listItemIcon}><Dashboard/></ListItemIcon>
                                <ListItemText primary="Dashboard"/>
                            </ListItem>

                            <ListItem button key="products" component={Link} to="/products">
                                <ListItemIcon><BorderAll/></ListItemIcon>
                                <ListItemText primary="Products"/>
                            </ListItem>

                            <ListItem button key="inventory" component={Link} to="/inventory">
                                <ListItemIcon><Place/></ListItemIcon>
                                <ListItemText primary="Inventory"/>
                            </ListItem>

                            <ListItem button key="orders" component={Link} to="/orders">
                                <ListItemIcon><ShoppingCart/></ListItemIcon>
                                <ListItemText primary="Orders"/>
                            </ListItem>
                            <ListItem button key="people" component={Link} to="/customers">
                                <ListItemIcon><People/></ListItemIcon>
                                <ListItemText primary="Customers"/>
                            </ListItem>


                        </List>
                        <Divider className={classes.divider}/>
                        <List>
                            <ListItem button key="store" component={Link} to="/store">
                                <ListItemIcon><Store/></ListItemIcon>
                                <ListItemText primary="Store"/>
                            </ListItem>
                        </List>
                        <Divider className={classes.divider}/>
                        <List>
                            <ListItem button key="invoice">
                                <ListItemIcon><Receipt/></ListItemIcon>
                                <ListItemText primary="Invoice"/>
                            </ListItem>
                            <ListItem button key="reports">
                                <ListItemIcon><Assessment/></ListItemIcon>
                                <ListItemText primary="Reports"/>
                            </ListItem>
                        </List>
                    </Drawer>
                    <Box className={classes.content}>
                        <div className={classes.toolbar}/>
                        <Navigation/>
                    </Box>
                </div>): <Navigation/>
    );
}
