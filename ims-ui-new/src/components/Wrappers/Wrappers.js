import React from "react";
import {
    withStyles,
    Badge as BadgeBase,
    Typography as TypographyBase,
    Button as ButtonBase,
} from "@material-ui/core";
import {useTheme, makeStyles} from "@material-ui/styles";
import classnames from "classnames";
import Icon from "@material-ui/core/Icon";
import Box from "@material-ui/core/Box";

// styles
const useStyles = makeStyles(theme => ({
    badge: {
        fontWeight: 600,
        height: 16,
        minWidth: 16,
    },
}));

function Badge({children, colorBrightness, color, ...props}) {
    const classes = useStyles();
    const theme = useTheme();
    const Styled = createStyled({
        badge: {
            backgroundColor: getColor(color, theme, colorBrightness),
        },
    });

    return (
        <Styled>
            {styledProps => (
                <BadgeBase
                    classes={{
                        badge: classnames(classes.badge, styledProps.classes.badge),
                    }}
                    {...props}
                >
                    {children}
                </BadgeBase>
            )}
        </Styled>
    );
}

function Typography({
                        children,
                        weight,
                        size,
                        colorBrightness,
                        color,
                        ...props
                    }) {
    const theme = useTheme();

    return (
        <TypographyBase
            style={{
                color: getColor(color, theme, colorBrightness),
                fontWeight: getFontWeight(weight),
                fontSize: getFontSize(size, props.variant, theme),
            }}
            {...props}
        >
            {children}
        </TypographyBase>
    );
}

function Button({children, color, ...props}) {
    const theme = useTheme();

    const Styled = createStyled({
        button: {
            backgroundColor: getColor(color, theme),
            boxShadow: theme.customShadows.widget,
            color: "white",
            "&:hover": {
                backgroundColor: getColor(color, theme, "light"),
                boxShadow: theme.customShadows.widgetWide,
            },
        },
    });

    return (
        <Styled>
            {({classes}) => (
                <ButtonBase classes={{root: classes.button}} {...props}>
                    {children}
                </ButtonBase>
            )}
        </Styled>
    );
}

function Rating({children, color, rating, ...props}) {
    const theme = useTheme();

    const Styled = createStyled({
        rating: {
            lineHeight: "normal",
            display: "inline",
            color: "#fff",
            padding: "2px 4px 2px 6px",
            borderRadius: "3px",
            fontWeight: "500",
            fontSize: "12px",
            verticalAlign: "middle",
            backgroundColor: "#388e3c",
            "&:hover": {
                backgroundColor: getColor(color, theme, "light"),
                boxShadow: theme.customShadows.widgetWide,
            },
        },
        ratingIcon:{
            fontSize: "inherit",
        }
    });

    return (
        <Styled>
            {({classes}) => (
                <span><Box component="div" className={classes.rating}><Icon className={classes.ratingIcon}>star_rate</Icon>{rating}</Box></span>
            )}
        </Styled>
    );
}


export {Badge, Typography, Button, Rating};

// ########################################################################

function getColor(color, theme, brigtness = "main") {
    if (color && theme.palette[color] && theme.palette[color][brigtness]) {
        return theme.palette[color][brigtness];
    }
}

function getFontWeight(style) {
    switch (style) {
        case "light":
            return 300;
        case "medium":
            return 500;
        case "bold":
            return 600;
        default:
            return 400;
    }
}

function getFontSize(size, variant = "", theme) {
    let multiplier;

    switch (size) {
        case "sm":
            multiplier = 0.8;
            break;
        case "md":
            multiplier = 1.5;
            break;
        case "xl":
            multiplier = 2;
            break;
        case "xxl":
            multiplier = 3;
            break;
        default:
            multiplier = 1;
            break;
    }

    const defaultSize =
        variant && theme.typography[variant]
            ? theme.typography[variant].fontSize
            : `${theme.typography.fontSize}px`;

    return `calc(${defaultSize} * ${multiplier})`;
}

function createStyled(styles, options) {
    const Styled = function (props) {
        const {children, ...other} = props;
        return children(other);
    };

    return withStyles(styles, options)(Styled);
}
