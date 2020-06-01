import React from "react";
import ReactDOM from "react-dom";
import {ThemeProvider} from "@material-ui/styles";
import {CssBaseline} from "@material-ui/core";

import Themes from "./themes";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import {LayoutProvider} from "./context/LayoutContext";
import {UserProvider} from "./context/UserContext";
import './icon.css'
import './index.css'
import {AppProvider} from "./context/AppContext";
import {CartProvider} from "./context/CartContext";
import {SnackbarProvider} from "notistack";
import {CloudinaryContext} from "cloudinary-react";

ReactDOM.render(
    <LayoutProvider>
        <CloudinaryContext cloudName="narendraims">
        <UserProvider>
            <AppProvider>
                <CartProvider>
                <ThemeProvider theme={Themes.default}>
                    <SnackbarProvider autoHideDuration={1000} hideIconVariant={false} maxSnack={3} iconVariant={{
                        success: '✅',
                        error: '✖️',
                        warning: '⚠️',
                        info: 'ℹ️',
                    }} anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}>
                    <CssBaseline/>
                    <App/>
                    </SnackbarProvider>
                </ThemeProvider>
                </CartProvider>
            </AppProvider>
        </UserProvider>
        </CloudinaryContext>
    </LayoutProvider>,
    document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
