import React from "react";
import '../css/staff-mgmt.css';
import Nav from './Nav';
import SideBar from './Sidebar';

function StaffMgmt() {
    return (
        <div className="staff-mgmt-page">
            <Nav />
            <div className="page-container">
                <SideBar />
                <div className="main-content-box">
                    <h1>Quản lý nhân viên</h1>
                    <div className="table-box">
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Tìm kiếm nhân viên..."
                                className="search-input"
                            />
                            <button className="search-button">
                                Tìm
                            </button>
                        </div>
                        <table className="staff-table">
                            <thead>
                                <tr>
                                    <th>Mã NV</th>
                                    <th>Họ tên</th>
                                    <th>Giới tính</th>
                                    <th>Email</th>
                                    <th>Ngày vào làm</th>
                                    <th>Mã chi nhánh</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>NV001</td>
                                    <td>Nguyễn Văn A</td>
                                    <td>Nam</td>
                                    <td>nguyenvana@example.com</td>
                                    <td>01/01/2020</td>
                                    <td>CN001</td>
                                </tr>
                                <tr>
                                    <td>NV002</td>
                                    <td>Trần Thị B</td>
                                    <td>Nữ</td>
                                    <td>tranthib@example.com</td>
                                    <td>15/03/2021</td>
                                    <td>CN002</td>
                                </tr>
                                <tr>
                                    <td>NV003</td>
                                    <td>Lê Văn C</td>
                                    <td>Nam</td>
                                    <td>levanc@example.com</td>
                                    <td>20/07/2019</td>
                                    <td>CN003</td>
                                </tr>
                                <tr>
                                    <td>NV004</td>
                                    <td>Phạm Thị D</td>
                                    <td>Nữ</td>
                                    <td>phamthid@example.com</td>
                                    <td>10/11/2018</td>
                                    <td>CN004</td>
                                </tr>
                                <tr>
                                    <td>NV005</td>
                                    <td>Hoàng Văn E</td>
                                    <td>Nam</td>
                                    <td>hoangvane@example.com</td>
                                    <td>05/05/2020</td>
                                    <td>CN005</td>
                                </tr>
                                <tr>
                                    <td>NV006</td>
                                    <td>Đỗ Thị F</td>
                                    <td>Nữ</td>
                                    <td>dothif@example.com</td>
                                    <td>22/08/2019</td>
                                    <td>CN006</td>
                                </tr>
                                <tr>
                                    <td>NV007</td>
                                    <td>Ngô Văn G</td>
                                    <td>Nam</td>
                                    <td>ngovang@example.com</td>
                                    <td>30/09/2021</td>
                                    <td>CN007</td>
                                </tr>
                                <tr>
                                    <td>NV008</td>
                                    <td>Vũ Thị H</td>
                                    <td>Nữ</td>
                                    <td>vuthih@example.com</td>
                                    <td>12/12/2020</td>
                                    <td>CN008</td>
                                </tr>
                                <tr>
                                    <td>NV009</td>
                                    <td>Trịnh Văn I</td>
                                    <td>Nam</td>
                                    <td>trinhvani@example.com</td>
                                    <td>18/01/2019</td>
                                    <td>CN009</td>
                                </tr>
                                <tr>
                                    <td>NV010</td>
                                    <td>Nguyễn Thị J</td>
                                    <td>Nữ</td>
                                    <td>nguyenthij@example.com</td>
                                    <td>25/02/2021</td>
                                    <td>CN010</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StaffMgmt;