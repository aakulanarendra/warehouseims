import React from 'react'
import {withRouter} from "react-router-dom";
import {useCartState} from "../../context/CartContext";
import Box from "@material-ui/core/Box";
import { NotificationsNone as NotificationsIcon, ShoppingCart as ShoppingCartIcon } from "@material-ui/icons";
import {makeStyles} from "@material-ui/styles";
import Chip from "@material-ui/core/Chip";
import { Badge } from "../Wrappers";
import { IconButton } from "@material-ui/core";
import useStyles from "./styles";



function getLabel(items) {
	if(!items.length) return "0";
	// let total = items.map(({salePrice, quantity}) => salePrice * quantity).reduce((sum, i) => sum + i, 0);
	// return  items.length + " Items(s) | $"+total;
	return  items.length


}

function CartDetails(props) {



	const classes = useStyles();
	const {items} = useCartState();
	return (
		<>
			{/*<Chip color="primary" icon={<ShoppingCartIcon />} label={getLabel(items)}></Chip>*/}

			<IconButton
				color="inherit"
				aria-haspopup="true"
				aria-controls="mail-menu"
				onClick={()=>{
					props.history.push(`/app/cart`);
				}}

				className={classes.headerMenuButton}
			>
				<Badge
					badgeContent={getLabel(items)}
					color="secondary"
				>
					<ShoppingCartIcon classes={{root: classes.headerIcon}}/>
				</Badge>
			</IconButton>
			{/*<Box className={classes.container} component="span"><ShoppingCartIcon /> Items(s)</Box>*/}
		</>
	)
}

export default withRouter(CartDetails);