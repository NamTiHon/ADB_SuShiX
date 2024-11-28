import React from "react";
import '../css/online-order-mgmt.css';
import Nav from './Nav';
import SideBar from './Sidebar';

function OnlineOrderMgmt() {
    return (
        <div className="online-order-mgmt-page">
            <Nav />
            <div className="page-container">
                <SideBar />
                <div className="main-content-box">
                    <h1>Danh sách đặt món online</h1>
                </div>
            </div>
        </div>
    );
}

export default OnlineOrderMgmt;