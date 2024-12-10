import React from "react";
import '../css/table-book-mgmt.css';
import Nav from './Nav';
import SideBar from './Sidebar';

function TableBookMgmt() {
    return (
        <div className="table-book-mgmt-page">
            <Nav />
            <div className="page-container">
                <SideBar />
                <div className="main-content-box">
                    <h1>Danh sách đặt bàn</h1>
                </div>
            </div>
        </div>
    );
}

export default TableBookMgmt;