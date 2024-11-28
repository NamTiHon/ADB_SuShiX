import React from "react";
import '../css/customer-mgmt.css';
import Nav from './Nav';
import SideBar from './Sidebar';

function CustomerMgmt() {
    return (
        <div className="customer-mgmt-page">
            <Nav />
            <div className="page-container">
                <SideBar />
                <div className="main-content-box">
                    <h1>Quản lí khách hàng</h1>
                </div>
            </div>
        </div>
    );
}

export default CustomerMgmt;