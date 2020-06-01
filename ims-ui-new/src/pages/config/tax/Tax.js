import React, { useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import * as Constants from "../../../utils/constants";
import { get, post } from "../../../utils/client";
import Fab from "@material-ui/core/Fab";
import { Typography } from "../../../components/Wrappers";
import List from "@material-ui/core/List";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles } from "@material-ui/styles";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";


const dataUrl = Constants.TAX_URL;
const updateUrl = Constants.TAX_UPDATE_URL;

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            maxWidth: 752,
        },
        demo: {
            backgroundColor: theme.palette.background.paper,
        },
        title: {
            margin: theme.spacing(4, 0, 2),
        },
    }),
);

export default function Tax(props) {

    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState(0);
    const [tax, setTax] = React.useState(0);
    const classes = useStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    function openEditModal() {
        setOpen(true);
    }

    function handleClose(event) {
        event.preventDefault()
        setOpen(false);
    }

    function handleSave(event) {
        let request = {tax: data};
        post(updateUrl, request, (res) => {
            setTax(data);
            enqueueSnackbar(`Updated Tax Successfully`,{
                variant: 'success'
            })
        }, function (response) {
            enqueueSnackbar('Failed to update tax: Please try again', {
                variant: 'error'
            })
        })
        event.preventDefault()
        setOpen(false);
    }

    const handleChange = (event) => {
        setData(event.target.value);
    };

    useEffect(() => {
        get(dataUrl, (data) => {
            setTax(data)
            setData(tax)
        }, function (response) {

        })
    }, []);


    return (
        <Grid item xs={12} md={6}>
            <Typography variant="h6" color={"primary"} className={classes.title}>
                Global Tax Configured
            </Typography>
            <div className={classes.demo}>
                <List dense={true}>
                        <ListItem>
                            <ListItemIcon>
                                     %
                            </ListItemIcon>
                            <ListItemText primary={tax}/>
                            <ListItemSecondaryAction>
                                <IconButton onClick={openEditModal} edge="end" aria-label="delete">
                                    <EditIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                </List>
            </div>

            <div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Update Tax</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="available"
                            label={"New Tax"}
                            type="email"
                            fullWidth
                            value={data}
                            onChange={(e) => handleChange(e)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Grid>
    )
}