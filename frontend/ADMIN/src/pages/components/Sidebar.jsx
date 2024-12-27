import React from 'react';
import '../css/components/sidebar.css';

function SideBar() {
    return (
        <aside className="sideBar">
            <ul>
                <a href="/mgmt-branch"><li>Quản lý chi nhánh</li></a>
                <a href="/mgmt-dish"><li>Quản lý món ăn</li></a>
                <a href="/mgmt-staff"><li>Quản lý nhân viên</li></a>
                <a href="/mgmt-customer"><li>Quản lý khách hàng</li></a>
                <a href="/mgmt-online-order"><li>Danh sách đặt online</li></a>
            </ul>
        </aside>
    );
}

export default SideBar;