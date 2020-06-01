import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import React from "react";

const theme = createMuiTheme({
    palette: {
        default: {
            light: '#ff545b',
            main: '#ff7b7e',
            dark: '#ff545d',
            contrastText: '#22212f',
        },
        // primary: {
        //     light: 'rgb(1, 87, 155)',
        //     main: 'rgb(1, 87, 155)',
        //     dark: 'rgb(1, 87, 155)',
        //     contrastText: '#fff',
        // },
        primary: {
            light: '#4285f4',
            main: '#4285f4',
            dark: '#4285f4',
            contrastText: '#fff',
        },
        warning: {
            light: '#ffb74d',
            main: '#ea9c29',
            dark: '#b36e00',
            contrastText: '#fff',
        },
        error: {
            light: '#f27573',
            main: '#ef5350',
            dark: '#a73a38',
            contrastText: '#fff',
        },
        success: {
            light: '#379B11',
            main: '#379B11',
            dark: '#379B11',
            contrastText: '#fff',
        },
        progress: {
            light: '#33eaff',
            main: '#00e5ff',
            dark: '#00a0b2',
            contrastText: '#fff',
        },
        orange: {
            light: '#ffac33',
            main: '#ff9800',
            dark: '#b26a00',
            contrastText: '#fff',
        },
    },
    shape: {
        borderRadius: 5,
    },
    item: {
        padding: '4px 24px',
        '& svg': {
            fontSize: 20,
        },
    },
    itemIcon: {
        margin: 0,
    },
    categoryHeader: {
        padding: '24px 24px 16px',
    },
});

const successThemePalette = {primary: theme.palette.success};
const successTheme = createMuiTheme({...theme, palette: successThemePalette});
export const SuccessThemeProvider = props => {
    return (
        <MuiThemeProvider theme={successTheme}>{props.children}</MuiThemeProvider>
    );
};


const warningThemePalette = {primary: theme.palette.warning};
const warningTheme = createMuiTheme({...theme, palette: warningThemePalette});
export const WarningThemeProvider = props => {
    return (
        <MuiThemeProvider theme={warningTheme}>{props.children}</MuiThemeProvider>
    );
};

const errorThemePalette = {primary: theme.palette.error};
const errorTheme = createMuiTheme({...theme, palette: errorThemePalette});
export const ErrorThemeProvider = props => {
    return (
        <MuiThemeProvider theme={errorTheme}>{props.children}</MuiThemeProvider>
    );
};

const progressThemePalette = {primary: theme.palette.progress};
const progressTheme = createMuiTheme({...theme, palette: progressThemePalette});
export const ProgressThemeProvider = props => {
    return (
        <MuiThemeProvider theme={progressTheme}>{props.children}</MuiThemeProvider>
    );
};

const orangeThemePalette = {primary: theme.palette.orange};
const orangeTheme = createMuiTheme({...theme, palette: orangeThemePalette});
export const OrangeThemeProvider = props => {
    return (
        <MuiThemeProvider theme={orangeTheme}>{props.children}</MuiThemeProvider>
    );
};

export default theme;
