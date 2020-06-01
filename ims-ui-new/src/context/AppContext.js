import React from "react";

const AppStateContext = React.createContext();
const AppDispatchContext = React.createContext();

function appReducer(state, action) {
    switch (action.type) {
        case "DATA_ADDED":
            return { ...state, 'data':([...state.data || [],action.data]) };
        case "SIGN_OUT_SUCCESS":
            return { ...state, isAuthenticated: false };
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

function AppProvider({ children }) {
    var [state, dispatch] = React.useReducer(appReducer, {...state,dataAdded:{}});

    return (
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>
                {children}
            </AppDispatchContext.Provider>
        </AppStateContext.Provider>
    );
}

function useAppState() {
    const context = React.useContext(AppStateContext);
    if (context === undefined) {
        throw new Error("useAppState must be used within a AppProvider");
    }
    return context;
}

function useAppDispatch() {
    const context = React.useContext(AppDispatchContext);
    if (context === undefined) {
        throw new Error("useAppDispatch must be used within a AppProvider");
    }
    return context;
}

export {AppProvider, useAppDispatch, useAppState };