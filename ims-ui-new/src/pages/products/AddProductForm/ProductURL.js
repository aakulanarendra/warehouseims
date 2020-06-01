import React from 'react';
import clsx from 'clsx';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import {productStyles} from "../ProductStyle";


export default function ProductURL(props) {
    const classes = productStyles();

    const {productUrl, setProductUrl} = props;

    const handleChange = name => event => {
        setProductUrl({...productUrl, [name]: event.target.value});
    };

    const fields = [
        {
            name: 'pageUrl',
            label: "Product Page Url",
            helperText: "URL of a product's page. For example, the product's page on Amazon or on eBay, or on your supplier's website."
        }
    ];

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                {fields.map((field, index) => {
                    return (
                        <Grid item>
                            <TextField
                                id={field.name}
                                className={clsx(classes.margin, classes.textField)}
                                label={field.label}
                                value={productUrl[field.name]}
                                onChange={handleChange(field.name)}
                                helperText={field.helperText}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    );
}