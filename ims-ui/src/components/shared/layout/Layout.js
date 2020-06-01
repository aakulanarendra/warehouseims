import React, {Component} from 'react'
import './Layout.css'
import AdminMainContainer from "../admin/main/MainContainer";
import UserMainContainer from "../user/main/MainContainer";
import {ToastContainer} from 'react-toastify'


export default class Layout extends Component {
    render() {

        const isAdmin = true;
        return (
            <div className="main-layout">
                {isAdmin ? <AdminMainContainer/> : <UserMainContainer/>}
            </div>

        )
    }
}