import tinycolor from "tinycolor2";

const primary = "#1890ff";
const secondary = "#FF5C93";
const warning = "#FFC260";
const success = "#3CD4A0";
const info = "#9013FE";

const lightenRate = 7.5;
const darkenRate = 15;

export default {
    fontFamily: "-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
    palette: {
        primary: {
            main: primary,
            light: tinycolor(primary)
                .lighten(lightenRate)
                .toHexString(),
            dark: tinycolor(primary)
                .darken(darkenRate)
                .toHexString(),
        },
        secondary: {
            main: secondary,
            light: tinycolor(secondary)
                .lighten(lightenRate)
                .toHexString(),
            dark: tinycolor(secondary)
                .darken(darkenRate)
                .toHexString(),
            contrastText: "#FFFFFF",
        },
        warning: {
            main: warning,
            light: tinycolor(warning)
                .lighten(lightenRate)
                .toHexString(),
            dark: tinycolor(warning)
                .darken(darkenRate)
                .toHexString(),
        },
        success: {
            main: success,
            light: tinycolor(success)
                .lighten(lightenRate)
                .toHexString(),
            dark: tinycolor(success)
                .darken(darkenRate)
                .toHexString(),
        },
        info: {
            main: info,
            light: tinycolor(info)
                .lighten(lightenRate)
                .toHexString(),
            dark: tinycolor(info)
                .darken(darkenRate)
                .toHexString(),
        },
        text: {
            primary: "#4A4A4A",
            secondary: "#666",
            hint: "#B9B9B9",
        },
        background: {
            default: "#eff1f4",
            light: "#e6f7ff",
        },
    },
    customShadows: {
        widget:
            "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
        widgetDark:
            "0px 3px 18px 0px #4558A3B3, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
        widgetWide:
            "0px 12px 33px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    },
    overrides: {
        MuiAppBar:{
            colorDefault:{
               backgroundColor:'#fff'
            }
        },
        MuiPaper: {
            elevation1: {
                boxShadow: 'none'
            },
            elevation2: {
                boxShadow: 'none'
            },
            elevation4: {
                boxShadow:  '0px 0px 0px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 5px 0px rgba(0,0,0,0.12)'
            }
        },
        MuiBackdrop: {
            root: {
                backgroundColor: "#4A4A4A1A",
            },
        },
        MuiMenu: {
            paper: {
                boxShadow:
                    "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
            },
        },
        MuiSelect: {
            icon: {
                color: "#B9B9B9",
            },
        },
        MuiListItem: {
            root: {
                "&$selected": {
                    backgroundColor: "#F3F5FF !important",
                    "&:focus": {
                        backgroundColor: "#F3F5FF",
                    },
                },
            },
            button: {
                "&:hover, &:focus": {
                    backgroundColor: "#F3F5FF",
                },
            },
        },
        MuiTouchRipple: {
            child: {
                backgroundColor: "white",
            },
        },
        MuiTableRow: {
            root: {
                height: 50,
            },
        },
        MuiTableCell: {
            root: {
                borderBottom: "1px solid #f4f4f4",
                padding: '13px'
            },
            head: {
                fontSize: "13px",
                color: "black"
            },
            body: {
                fontSize: "13px",
            },
        },
    },
};
