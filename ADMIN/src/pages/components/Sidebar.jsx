import React from 'react';
import '../css/sidebar.css';
function SideBar(){
    return (
        <aside className="sideBar">
            <ul>
                <li>Quản lý nhân viên</li>
                <li>Quản lý khách hàng</li>
                <li>Danh sách đặt bàn</li>
                <li>Danh sách đặt món oline</li>
            </ul>
        </aside>
    );
}

export default SideBar;