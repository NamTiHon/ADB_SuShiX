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
                        <table className="customer-table">
                            <thead>
                                <tr>
                                    <th>SĐT</th>
                                    <th>Họ tên</th>
                                    <th>Giới tính</th>
                                    <th>CCCD</th>
                                    <th>Email</th>
                                    <th>Ngày tạo</th>
                                    <th>Loại TV</th>
                                    <th>Tình trạng</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>0123456789</td>
                                    <td>Nguyễn Văn A</td>
                                    <td>Nam</td>
                                    <td>123456789</td>
                                    <td>nguyenvana@example.com</td>
                                    <td>2023-01-01</td>
                                    <td>Membership</td>
                                    <td>Hoạt động</td>
                                </tr>
                                <tr>
                                    <td>0987654321</td>
                                    <td>Trần Thị B</td>
                                    <td>Nữ</td>
                                    <td>987654321</td>
                                    <td>tranthib@example.com</td>
                                    <td>2023-02-01</td>
                                    <td>Silver</td>
                                    <td>Hoạt động</td>
                                </tr>
                                <tr>
                                    <td>0123987654</td>
                                    <td>Lê Văn C</td>
                                    <td>Nam</td>
                                    <td>123498765</td>
                                    <td>levanc@example.com</td>
                                    <td>2023-03-01</td>
                                    <td>Gold</td>
                                    <td>Hoạt động</td>
                                </tr>
                                <tr>
                                    <td>0987123456</td>
                                    <td>Phạm Thị D</td>
                                    <td>Nữ</td>
                                    <td>987612345</td>
                                    <td>phamthid@example.com</td>
                                    <td>2023-04-01</td>
                                    <td>Membership</td>
                                    <td>Hoạt động</td>
                                </tr>
                                <tr>
                                    <td>0123678945</td>
                                    <td>Hoàng Văn E</td>
                                    <td>Nam</td>
                                    <td>123467894</td>
                                    <td>hoangvane@example.com</td>
                                    <td>2023-05-01</td>
                                    <td>Silver</td>
                                    <td>Hoạt động</td>
                                </tr>
                                <tr>
                                    <td>0987345612</td>
                                    <td>Đỗ Thị F</td>
                                    <td>Nữ</td>
                                    <td>987634561</td>
                                    <td>dothif@example.com</td>
                                    <td>2023-06-01</td>
                                    <td>Gold</td>
                                    <td>Hoạt động</td>
                                </tr>
                                <tr>
                                    <td>0123456781</td>
                                    <td>Ngô Văn G</td>
                                    <td>Nam</td>
                                    <td>123456781</td>
                                    <td>ngovang@example.com</td>
                                    <td>2023-07-01</td>
                                    <td>Membership</td>
                                    <td>Hoạt động</td>
                                </tr>
                                <tr>
                                    <td>0987654322</td>
                                    <td>Vũ Thị H</td>
                                    <td>Nữ</td>
                                    <td>987654322</td>
                                    <td>vuthih@example.com</td>
                                    <td>2023-08-01</td>
                                    <td>Silver</td>
                                    <td>Hoạt động</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerMgmt;