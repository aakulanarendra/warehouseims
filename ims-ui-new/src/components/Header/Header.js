import React, { useState } from "react";
import { AppBar, Fab, IconButton, InputBase, Menu, MenuItem, Toolbar, } from "@material-ui/core";
import {
    ArrowBack as ArrowBackIcon,
    Menu as MenuIcon,
    NotificationsNone as NotificationsIcon,
    Person as AccountIcon,
    Search as SearchIcon,
    Send as SendIcon,
} from "@material-ui/icons";
import classNames from "classnames";
import Link from "@material-ui/core/Link";
import logo from '../../logo.svg'
// styles
import useStyles from "./styles";
// components
import { Badge, Typography } from "../Wrappers/Wrappers";
import Notification from "../Notification/Notification";
// context
import { toggleSidebar, useLayoutDispatch, useLayoutState, } from "../../context/LayoutContext";
import { signOut, useUserDispatch, useUserState } from "../../context/UserContext";
import ShoppingCart from "./shoppingCart";


export default function Header(props) {
    const classes = useStyles();

    // global
    const layoutState = useLayoutState();
    const layoutDispatch = useLayoutDispatch();
    const userDispatch = useUserDispatch();
    const {user} = useUserState();

    // local
    const [mailMenu, setMailMenu] = useState(null);
    const [isMailsUnread, setIsMailsUnread] = useState(true);
    const [notificationsMenu, setNotificationsMenu] = useState(null);
    const [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
    const [profileMenu, setProfileMenu] = useState(null);
    const [isSearchOpen, setSearchOpen] = useState(false);

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    color="inherit"
                    onClick={() => toggleSidebar(layoutDispatch)}
                    className={classNames(
                        classes.headerMenuButton,
                        classes.headerMenuButtonCollapse,
                    )}
                >
                    {layoutState.isSidebarOpened ? (
                        <ArrowBackIcon
                            classes={{
                                root: classNames(
                                    classes.headerIcon,
                                    classes.headerIconCollapse,
                                ),
                            }}
                        />
                    ) : (
                        <MenuIcon
                            classes={{
                                root: classNames(
                                    classes.headerIcon,
                                    classes.headerIconCollapse,
                                ),
                            }}
                        />
                    )}
                </IconButton>
                <div className={classes.logotype}>
                    <Link to="/">
                        <img src={logo} title="IMS" alt="IMS"/>
                    </Link>
                </div>

                <>
                    <div className={classes.grow}/>
                    <div
                        className={classNames(classes.search, {
                            [classes.searchFocused]: isSearchOpen,
                        })}
                    >
                        <div
                            className={classNames(classes.searchIcon, {
                                [classes.searchIconOpened]: isSearchOpen,
                            })}
                            onClick={() => setSearchOpen(!isSearchOpen)}
                        >
                            <SearchIcon classes={{root: classes.headerIcon}}/>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                    </div>
                </>

                <ShoppingCart/>



                <IconButton
                    aria-haspopup="true"
                    color="inherit"
                    className={classes.headerMenuButton}
                    aria-controls="profile-menu"
                    onClick={e => setProfileMenu(e.currentTarget)}
                >
                    <AccountIcon classes={{root: classes.headerIcon}}/>
                </IconButton>
                <Menu
                    id="mail-menu"
                    open={Boolean(mailMenu)}
                    anchorEl={mailMenu}
                    onClose={() => setMailMenu(null)}
                    MenuListProps={{className: classes.headerMenuList}}
                    className={classes.headerMenu}
                    classes={{paper: classes.profileMenu}}
                    disableAutoFocusItem
                >
                    <div className={classes.profileMenuUser}>
                        <Typography variant="h4" weight="medium">
                            New Messages
                        </Typography>
                        <Typography
                            className={classes.profileMenuLink}
                            component="a"
                            color="secondary"
                        />
                    </div>
                    <Fab
                        variant="extended"
                        color="primary"
                        aria-label="Add"
                        className={classes.sendMessageButton}
                    >
                        Send New Message
                        <SendIcon className={classes.sendButtonIcon}/>
                    </Fab>
                </Menu>
                <Menu
                    id="profile-menu"
                    open={Boolean(profileMenu)}
                    anchorEl={profileMenu}
                    onClose={() => setProfileMenu(null)}
                    className={classes.headerMenu}
                    classes={{paper: classes.profileMenu}}
                    disableAutoFocusItem
                >
                    <div className={classes.profileMenuUser}>
                        <Typography variant="h4" weight="medium">
                            {user}
                        </Typography>
                        <Typography
                            className={classes.profileMenuLink}
                            component="a"
                            color="primary"
                            href="https://ims.com"
                        >
                            IMS
                        </Typography>
                    </div>
                    <MenuItem
                        className={classNames(
                            classes.profileMenuItem,
                            classes.headerMenuItem,
                        )}
                    >
                        <AccountIcon className={classes.profileMenuIcon}/> Profile
                    </MenuItem>
                    <MenuItem
                        className={classNames(
                            classes.profileMenuItem,
                            classes.headerMenuItem,
                        )}
                    >
                        <AccountIcon className={classes.profileMenuIcon}/> Tasks
                    </MenuItem>
                    <MenuItem
                        className={classNames(
                            classes.profileMenuItem,
                            classes.headerMenuItem,
                        )}
                    >
                        <AccountIcon className={classes.profileMenuIcon}/> Messages
                    </MenuItem>
                    <div className={classes.profileMenuUser}>
                        <Typography
                            className={classes.profileMenuLink}
                            color="primary"
                            onClick={() => signOut(userDispatch, props.history)}
                        >
                            Sign Out
                        </Typography>
                    </div>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}
