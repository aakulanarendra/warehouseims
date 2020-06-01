import React, { useEffect, useRef } from 'react'
import { browseStyles } from "./BrowseProductStyle";
import { toggleSearchBar, toggleSidebar, useLayoutDispatch } from "../../../context/LayoutContext";
import GridList from '@material-ui/core/GridList/index';
import GridListTile from '@material-ui/core/GridListTile/index';
import GridListTileBar from '@material-ui/core/GridListTileBar/index';
import ListSubheader from '@material-ui/core/ListSubheader/index';
import { useTheme } from "@material-ui/core/index";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import IconButton from '@material-ui/core/IconButton/index';
import { get } from "../../../utils/client";
import * as Constants from "../../../utils/constants";
import { Image } from "cloudinary-react";
import { Link as RouterLink } from "react-router-dom";

const categoryList = Constants.CATEGORY_LIST_URL;

export default function ShopBrowse(props) {
    const classes = browseStyles();
    const [searchParam, setSearchParam] = React.useState("");
    const [categories, setCategories] = React.useState([]);
    const searchBarRef = useRef(null);

    const layoutDispatch = useLayoutDispatch();
    const theme = useTheme();
    const windowWidth = window.innerWidth;
    const breakpointWidth = theme.breakpoints.values.md;
    const isSmallScreen = windowWidth < breakpointWidth;
    const cols = isSmallScreen ? 2 :4;

    useEffect(() => {
        get(categoryList, (data) => {
            setCategories(data)
        }, function (response) {

        })

    }, []);

    function searchProduct(event) {
        const searchParamText = event ? event.target.value.toLowerCase() : "";
        setSearchParam(searchParamText);

    }

    return (
        <>
            <div className={classes.root}>
                <GridList spacing={10} cols={cols} cellHeight={180} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={cols} style={{ height: 'auto' }}>
                        <ListSubheader component="div">Categories</ListSubheader>
                    </GridListTile>
                    {categories.map((tile,index) => (
                        <GridListTile key={tile.img} style={{cursor:"pointer"}} component={RouterLink}
                                      to={`category/${tile.categoryCode}`}>
                            {tile.imageUrls ? <Image publicId={`${tile.imageUrls[0]}.jpg`} alt={tile.title} width={"350px"}/> :<> </>}

                            <GridListTileBar
                                title={tile.categoryName}
                                subtitle={<span>{tile.description}</span>}
                                actionIcon={
                                    <IconButton aria-label={`star ${tile.categoryName}`}>
                                        <NavigateNextIcon className={classes.shopNext} />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        </>

    )
}
