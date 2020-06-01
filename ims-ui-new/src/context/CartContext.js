import React, { createContext, useContext, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

function cartReducer(state, action) {
    switch (action.type) {
        case "ADD":
            return {...state, items: addToCart(state, action.payload)};
        case "REMOVE":
            return {...state, items: removeFromCart(state, action.payload)};
        case "REMOVE_ALL":
            return {...state, items: removeAll(state, action.payload)};
        case "ADD_ONE_QNTY":
            return {...state, items: incQuantity(state, action.payload)};
        case "REMOVE_ONE_QNTY":
            return {...state, items: decQuantity(state, action.payload)};
        case "CHANGE_QNTY":
            return {...state, items: changeQuantity(state, action.payload, action.value)};
        case "SEARCH_PRODUCTS":
            return {...state, searchProducts: action.payload};
        case "SIGN_OUT_SUCCESS":
            return {...state, isAuthenticated: false};
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

const addToCart = (state, product) => {
    const {available} = product;
    const productMatched = state.items.find((cartPrd) => {
        return cartPrd.barcode === product.barcode;
    });

    const quantity = 1;
    if (productMatched) {
        const quantityVal = productMatched.quantity < product.available ? productMatched.quantity + 1 : productMatched.quantity;
        return state.items.map(item => item.barcode === product.barcode ? {...item, 'quantity': quantityVal} : item)
    }
    const stateItems = [...state.items, {...product, quantity: 1}]

    localStorage.setItem("items", JSON.stringify(stateItems));

    return stateItems;

};


const removeFromCart = (state, product) => {
    const indexToRemove = state.items.findIndex(x => x.barcode === product.barcode);
    const stateItems = [...state.items.slice(0, indexToRemove), ...state.items.slice(indexToRemove + 1)]

    localStorage.setItem("items", JSON.stringify(stateItems));

    return stateItems;

};

const removeAll = (state, product) => {

    const stateItems = [];

    localStorage.removeItem("items");

    return stateItems;

};

const incQuantity = (state, product) => {
    const {available} = product;
    const quantityVal = product.quantity < product.available ? product.quantity + 1 : product.quantity;
    const stateItems = state.items.map(item => item.barcode === product.barcode ? {
        ...item,
        'quantity': quantityVal
    } : item)

    localStorage.setItem("items", JSON.stringify(stateItems));

    return stateItems;
};

const decQuantity = (state, product) => {
    const stateItems = state.items.map(item => item.barcode === product.barcode ? {
        ...item,
        'quantity': product.quantity - 1
    } : item)

    localStorage.setItem("items", JSON.stringify(stateItems));

    return stateItems;
};

const changeQuantity = (state, product, value) => {
    let quantityVal = '';

    if (!isNaN(value)) {
        quantityVal = value < product.available ? value : product.available;
    }

    const stateItems = state.items.map(item => item.barcode === product.barcode ? {
        ...item,
        'quantity': quantityVal
    } : item)

    localStorage.setItem("items", JSON.stringify(stateItems));

    return stateItems;
};


const searchProducts = (state, products) => {
    return {...state, searchProducts: products};
};

const CartProvider = ({children}) => {
    const items = JSON.parse((localStorage.getItem("items") || '[]'));
    const initialData = {isLoading: false, items: items}
    const [state, dispatch] = useReducer(cartReducer, initialData);
    return (
        <CartStateContext.Provider value={state}>
            <CartDispatchContext.Provider value={dispatch}>
                {children}
            </CartDispatchContext.Provider>
        </CartStateContext.Provider>
    );
};
const useCartState = () => useContext(CartStateContext);
const useCartDispatch = () => useContext(CartDispatchContext);
export { CartProvider, useCartState, useCartDispatch };
