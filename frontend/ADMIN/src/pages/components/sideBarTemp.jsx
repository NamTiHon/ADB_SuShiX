import React from 'react';
import '../css/components/sidebar.css';

function SideBarTemp() {
    return (
        <aside className="sideBar">
            <ul>
                <a href="/mgmt-customer"><li>Quản lý khách hàng</li></a>
                <a href="/staff-add-booking"><li>Đặt món</li></a>
            </ul>
        </aside>
    );
}

export default SideBarTemp;