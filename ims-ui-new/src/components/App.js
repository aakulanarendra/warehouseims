import React from "react";
import {HashRouter, Route, Switch, Redirect} from "react-router-dom";

// components


// pages
import {ToastContainer} from "react-toastify";
import Error from "../pages/error";
import Login from "../pages/login";

// context
import {useUserState} from "../context/UserContext";
import Layout from "./Layout/Layout";
import UnAuthorized from "../pages/error/UnAuthorized";

export default function App() {
    // global
    const {isAuthenticated} = useUserState();


    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/app/shop"/>}/>
                <Route
                    exact
                    path="/app"
                    render={() => <Redirect to="/app/shop"/>}
                />
                <PrivateRoute path="/app" component={Layout}/>
                <PublicRoute path="/login" component={Login}/>
                <Route path="/unauthorized" component={UnAuthorized}/>
                <Route component={Error}/>
            </Switch>
        </HashRouter>
    );

    // #######################################################################

    function PrivateRoute({component, ...rest}) {
        return (
            <Route
                {...rest}
                render={props =>
                    isAuthenticated ? (
                        React.createElement(component, props)
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location,
                                },
                            }}
                        />
                    )
                }
            />
        );
    }

    function PublicRoute({component, ...rest}) {
        return (
            <Route
                {...rest}
                render={props =>
                    isAuthenticated ? (
                        <Redirect
                            to={{
                                pathname: "/",
                            }}
                        />
                    ) : (
                        React.createElement(component, props)
                    )
                }
            />
        );
    }
}
