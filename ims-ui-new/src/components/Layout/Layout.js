import React from "react";
import { Redirect, Route, Switch, withRouter, } from "react-router-dom";
import classnames from "classnames";
// styles
import useStyles from "./styles";
// components
import Header from "../Header";
import Sidebar from "../Sidebar";
// pages
import Dashboard from "../../pages/dashboard";
// context
import { useLayoutState } from "../../context/LayoutContext";
import ProductList from "../../pages/products/ProductList";
import AddProduct from "../../pages/products/AddProduct";
import Orders from "../../pages/orders/Orders";
import { Inventory } from "../../pages/Inventory";
import { Customers } from "../../pages/customers";
import AddCustomer from "../../pages/customers/AddCustomer";
import Roles from "../../pages/config/roles/Roles";
import AddRole from "../../pages/config/roles/AddRole";
import RoleView from "../../pages/config/roles/RoleView";
import Pages from "../../pages/config/pages/Pages";
import BrandList from "../../pages/config/brand/BrandList";
import StoreList from "../../pages/config/store/StoreList";
import DepartmentList from "../../pages/config/department/DepartmentList";
import AttributesList from "../../pages/config/attributes/AttributesList";
import CustomerView from "../../pages/customers/CustomerView";
import CategoryList from "../../pages/config/category/CategoryList";
import CategoryView from "../../pages/config/category/CategoryView";
import ShopBrowse from "../../pages/shop/online/ShopBrowse";
import CategoryBrowse from "../../pages/shop/online/CategoryBrowse";
import OrderConfirm from "../../pages/shop/online/OrderConfirm";
import StoreBrowse from "../../pages/shop/store/StoreBrowse";
import CartDetails from "../../pages/shop/online/CartDetails";
import Tax from "../../pages/config/tax/Tax";


function Layout(props) {
  const classes = useStyles();

  // global
  const layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/app/dashboard" component={Dashboard} />

              <Route exact path="/app/customers" component={Customers} />
              <Route exact path="/app/customers/add" component={AddCustomer} />
              <Route exact path="/app/customers/:id" component={CustomerView} />


              <Route exact path="/app/settings/pages" component={Pages} />
              <Route exact path="/app/settings/roles" component={Roles} />
              <Route exact path="/app/settings/roles/add" component={AddRole} />
              <Route exact path="/app/settings/roles/:id" component={RoleView} />

              <Route
                  exact
                  path="/app/config"
                  render={() => <Redirect to="/app/config" />}
              />
              <Route path="/app/config/brand" component={BrandList} />
              <Route path="/app/config/store" component={StoreList} />
              <Route path="/app/config/department" component={DepartmentList} />
              <Route path="/app/config/tax" component={Tax} />
              <Route path="/app/config/attributes" component={AttributesList} />
              <Route exact path="/app/config/category" component={CategoryList} />
              <Route exact path="/app/config/category/:id" component={CategoryView} />


              <Route exact path="/app/products" component={ProductList} />
              <Route exact path="/app/products/add" component={AddProduct} />
               <Route exact path="/app/product/:id" component={AddProduct} />


              <Route exact path="/app/inventory" component={Inventory} />
              <Route exact path="/app/orders" roles={["admin"]} component={Orders} />


              <Route exact path="/app/store" component={StoreBrowse} />
              <Route exact path="/app/shop" component={ShopBrowse} />
              <Route exact path="/app/category/:id" component={CategoryBrowse} />
              <Route exact path="/app/cart" component={CartDetails} />
              <Route exact path="/app/order/confirm/:id" component={OrderConfirm} />
            </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
