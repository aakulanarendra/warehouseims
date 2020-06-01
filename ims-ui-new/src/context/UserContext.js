import React from "react";
import {toast} from "react-toastify";
import * as Constants from "../utils/constants";
import {post} from "../utils/client";

const UserStateContext = React.createContext();
const UserDispatchContext = React.createContext();

const loginAPi = Constants.CUSTOMER_LOGIN_URL;

function userReducer(state, action) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {...state, ...{isAuthenticated: true,pages:action.payload.pages, user: action.payload.user, userRole: action.payload.userRole}};
        case "LOGIN_FAILURE":
            return {...state, isAuthenticated: false};
        case "SIGN_OUT_SUCCESS":
            return {...state, isAuthenticated: false};
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

function UserProvider({children}) {
    const [state, dispatch] = React.useReducer(userReducer, {
        pages: JSON.parse(localStorage.getItem("pages")),
        isAuthenticated: !!localStorage.getItem("id_token"),
        userRole: localStorage.getItem("role")
    });

    return (
        <UserStateContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    );
}

function useUserState() {
    const context = React.useContext(UserStateContext);
    if (context === undefined) {
        throw new Error("useUserState must be used within a UserProvider");
    }
    return context;
}

function useUserDispatch() {
    const context = React.useContext(UserDispatchContext);
    if (context === undefined) {
        throw new Error("useUserDispatch must be used within a UserProvider");
    }
    return context;
}

export {UserProvider, useUserState, useUserDispatch, loginUser, signOut};

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
    setError(false);
    setIsLoading(true);


    if (!!login && !!password) {
        const request = {userName: login, password}
        post(loginAPi, request, (data) => {

            if(data.authorized===true) {
                toast.success('user authenticated successfully')
                setTimeout(() => {
                    localStorage.setItem("id_token", "1");
                    localStorage.setItem("role", data.role);
                    localStorage.setItem("pages", JSON.stringify(data.pages));
                    dispatch({type: "LOGIN_SUCCESS", payload: {user: login,pages:data.pages,password, userRole: login}});
                    setError(null);
                    setIsLoading(false);

                    history.push("/app/dashboard");
                }, 2000);
            }else{
                loginFailed()
            }

        }, function (response) {
            loginFailed()
        });

    } else {
        loginFailed()
    }

    function loginFailed() {
        setError(true);
        setIsLoading(false);
        // dispatch({type: "LOGIN_FAILURE"});

    }
}


function signOut(dispatch, history) {
    localStorage.removeItem("id_token");
    localStorage.removeItem("role");
    localStorage.removeItem("pages");
    localStorage.removeItem("items");
    dispatch({type: "SIGN_OUT_SUCCESS"});
    history.push("/login");
}
