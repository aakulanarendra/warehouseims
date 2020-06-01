import React, {useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import MUIDataTable from "mui-datatables";
import Typography from "@material-ui/core/Typography";
import * as Constants from "../../utils/constants";
import {get} from "../../utils/client";
import {Styles} from "./Style";
import {pathMatchRegexp} from "../../utils";

const byId = Constants.CUSTOMER_BY_ID;

function getValue(obj,key) {
    if(key==='stores'){
        let storeList = "";
        const stores = obj[key];
        stores||[].map((store, index) => {
            storeList = `${store.code  },`
        });
        return storeList.substring(0, storeList.length - 1);
    }
        return JSON.stringify(obj[key]);


}

export default function CustomerView(props) {
    const classes = Styles();
    const [customer, setCustomer] = React.useState({});
    const {id} = props.match.params


    useEffect(() => {
        get(`${byId  }/${id}`, (data) => {
            setCustomer(data);
        }, function (response) {

        })
    }, []);

    return (
        <Grid className={classes.mainContainer} item xs={12}>
            <Typography variant="h4" className={classes.header}> Customer Details</Typography>
            <div className={classes.content}>
            {
                Object.keys(customer).map(key =>
                    <div key={key} className={classes.item}>
                        <div>{key}</div>
                        <div>{getValue(customer,key)}</div>
                    </div>
                )
            }
            </div>
        </Grid>
    )
}