import React, { useState } from 'react';
import '../css/css-modals/add-branch.css';

const Add_Branch = ({ onClose, onAdd }) => {
    const [newBranch, setNewBranch] = useState({
        name: 'Chi nhánh 1',
        address: 'khkhkkh',
        openingTime: '07:00',
        closingTime: '19:00',
        phone: '0123456789',
        isMotorPark: false,
        isCarPark: false,
        hasDelivery: true,
        managerId: '51461',
        regionId: '20'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = e.target.type === 'checkbox' ? e.target.checked : value;
        setNewBranch((prevBranch) => ({
            ...prevBranch,
            [name]: newValue,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const branchWithInfo = {
            ...newBranch,
            branchId: generateBranchId(),
            createdDate: new Date().toISOString().split('T')[0],
            status: 'Pending',
        };
        onAdd(branchWithInfo);
        alert('Thêm chi nhánh thành công');
        onClose();
    };

    const generateBranchId = () => {
        return 'BRANCH' + Math.floor(Math.random() * 1000000);
    };

    return (
        <div className="">
            <div className="modal-overlay">
                <div className="modal-content">
                    <button className="close-button" onClick={onClose}>X</button>
                    <h2>THÊM CHI NHÁNH</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-section">
                            <h3>THÔNG TIN CHI NHÁNH</h3>
                            <p><strong>Địa chỉ:</strong> <input type="text" name="address" value={newBranch.address} onChange={handleChange} required /></p>
                            <p><strong>Giờ mở cửa:</strong> <input type="time" name="openingTime" value={newBranch.openingTime} onChange={handleChange} required /></p>
                            <p><strong>Giờ đóng cửa:</strong> <input type="time" name="closingTime" value={newBranch.closingTime} onChange={handleChange} required /></p>
                            <p><strong>Số điện thoại:</strong> <input type="text" name="phone" value={newBranch.phone} onChange={handleChange} required /></p>
                            <p><strong>Có bãi xe máy:</strong> <input type="checkbox" name="isMotorPark" checked={newBranch.isMotorPark} onChange={handleChange} /></p>
                            <p><strong>Có bãi xe ô tô:</strong> <input type="checkbox" name="isCarPark" checked={newBranch.isCarPark} onChange={handleChange} /></p>
                            <p><strong>Có giao hàng:</strong> <input type="checkbox" name="hasDelivery" checked={newBranch.hasDelivery} onChange={handleChange} /></p>
                            <p><strong>Mã quản lý:</strong> <input type="text" name="managerId" value={newBranch.managerId} onChange={handleChange} required /></p>
                            <p><strong>Mã khu vực:</strong> <input type="text" name="regionId" value={newBranch.regionId} onChange={handleChange} required /></p>
                            <button type="submit" className="add-button">Thêm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Add_Branch;