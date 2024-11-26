import React from "react";
import Nav from './Nav';

import '../css/home.css';
function Home(){
    return (
        <div className="homePage">
            <Nav />
            <div className="adminContainer">
                <aside className="sideBar">
                    <ul>
                        <li>Quản lý nhân viên</li>
                        <li>Quản lý khách hàng</li>
                        <li>Danh sách đặt bàn</li>
                        <li>Danh sách đặt món oline</li>
                    </ul>
                </aside>
                <div className="mainContent">
                    <h1>Chào mừng, Admin!</h1>
                </div>
            </div>
            
        </div>
    );
}
export default Home;