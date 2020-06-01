
// LoginAPI
export const CUSTOMER_LOGIN_URL = "/api/customer/login";


export const DASHBOARD_URL='/api/dashboard';

// Products
export const PRODUCT_LIST_URL='/api/products';
export const PRODUCT_ADD ='/api/product';
export const PRODUCT_UPDATE ='/api/product/update';
export const PRODUCT_DELETE ='/api/product/';
export const PRODUCT_BY_ID ='/api/product/';
export const PRODUCT_EDIT_ID ='/api/product/edit/';
export const SEARCH_PRODUCTS ='/api/product/search/';
export const PRODUCT_INVENTORY = "/api/product/inventory";
export const PRODUCT_PRICE_UPDATE = "/api/product/price";
export const PRODUCT_TAX_UPDATE = "/api/product/tax";
export const PRODUCT_STOCK_UPDATE = "/api/product/inventory";


// Orders
export const ORDERS_LIST_URL='api/order/list';
export const ORDERS_STATUS_URL='api/order/status/';
export const ORDERS_PLACE_URL='api/order/place';
export const ORDERS_BY_ID='api/order/:id';
export const ORDER_CUSTOMER_URL='api/order/:id/customer';

// Customers
export const CUSTOMER_LIST_URL='api/customerlist';
export const CUSTOMER_ADD='api/customer/';
export const CUSTOMER_BY_ID='/api/customers';

export const CATEGORY_LIST_URL='api/category';
export const CATEGORY_ADD ='api/category';
export const CATEGORY_BY_ID ='api/category';
export const CATEGORY_PRODUCTS_LIST_URL='api/category/:id/products';
export const CATEGORY_CODES='api/category/codes';

export const BRAND_LIST_URL='/api/brands';
export const BRAND_ADD ='/api/brands';
export const BRAND_BY_ID ='/api/admin/brand';

export const TAX_URL='/api/tax';
export const TAX_UPDATE_URL ='/api/tax/update';


export const STORE_LIST_URL='/api/admin/store';
export const STORE_ADD ='/api/admin/store';
export const STORE_BY_ID ='/api/admin/store';

export const ATTRIBUTE_LIST_URL='/api/attributes';
export const ATTRIBUTE_COLOUR_ADD ='/api/attributes/colour';
export const ATTRIBUTE_SIZE_ADD ='/api/attributes/size';

export const DEPARTMENT_LIST_URL='/api/admin/department';
export const DEPARTMENT_ADD ='/api/admin/department';
export const DEPARTMENT_BY_ID ='/api/admin/department';

export const ROLES_LIST = 'api/roles';
export const ROLE_ADD = 'api/roles';
export const ROLE_BY_ID = 'api/roles';
export const ROLE_PAGES = 'api/roles/pages';
export const ROLE_USERS = 'api/roles/users';

export const PAGES_LIST = 'api/pages';
export const PAGES_ADD = 'api/pages';
export const PAGES_BY_ID = 'api/pages';

export const STORE_PRODUCT_LIST_URL='/api/product/list';



// Attributes
export const ATTRIBUTES_ADD_URL='/attribute/add';


export const headerStyle = {headerStyle: {backgroundColor: '#85afff', color: '#FFF', padding: '10px'}}
export const headerStyleWithIndex = {actionsColumnIndex: -1,headerStyle: {backgroundColor: '#85afff', color: '#FFF', padding: '10px'}}