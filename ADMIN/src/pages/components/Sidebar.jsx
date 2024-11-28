import React from 'react';
import '../css/sidebar.css';

function SideBar() {
    return (
        <aside className="sideBar">
            <ul>
                <a href="/staff-mgmt"><li>Quản lý nhân viên</li></a>
                <a href="/customer-mgmt"><li>Quản lý khách hàng</li></a>
                <a href="/table-book-mgmt"><li>Danh sách đặt bàn</li></a>
                <a href="/online-order-mgmt"><li>Danh sách đặt món online</li></a>
            </ul>
        </aside>
    );
}

export default SideBar;