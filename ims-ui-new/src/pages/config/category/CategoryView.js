import React, {useEffect} from 'react';
import * as Constants from "../../../utils/constants";
import {get} from "../../../utils/client";
import Grid from "@material-ui/core/Grid";
import {categoryStyles} from "./CategoryStyle";
import MUIDataTable from "mui-datatables";
import {pathMatchRegexp} from "../../../utils";
import Typography from "@material-ui/core/Typography";

const categoryById = Constants.CATEGORY_BY_ID;

function getValue(obj,key) {
    if(key==='stores'){
        let storeList = "";
        let stores = obj[key];
        stores||[].map((store, index) => {
            storeList = store.code + ","
        });
        return storeList.substring(0, storeList.length - 1);
    }else{
        return obj[key];
    }

}

export default function CategoryView(props) {
    const classes = categoryStyles();
    const [category, setCategory] = React.useState({});
    const id = props.match.params.id


    useEffect(() => {
        get(categoryById + "/" + id, (data) => {
            setCategory(data);
        }, function (response) {

        })
    }, []);

    return (
        <Grid className={classes.mainContainer} item xs={12}>
            <Typography variant={"h4"} className={classes.header}> Category Details</Typography>
            <div className={classes.content}>
            {
                Object.keys(category).map(key =>
                    <div key={key} className={classes.item}>
                        <div>{key}</div>
                        <div>{getValue(category,key)}</div>
                    </div>
                )
            }
            </div>
        </Grid>
    )
}