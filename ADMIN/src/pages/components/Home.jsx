import React from "react";
import Nav from './Nav';

import '../css/home.css';
function Home(){
    return (
        <div className="homePage">
            <Nav />
            <aside className="sideBar">
                <ul>
                    <li>Quản lý nhân viên</li>
                    <li>Quản lý khách hàng</li>
                    <li>Danh sách đặt bàn</li>
                    <li>Danh sách đặt món oline</li>
                </ul>
            </aside>
        </div>
    );
}
export default Home;