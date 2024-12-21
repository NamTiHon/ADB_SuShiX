import React, { useState } from 'react';
import '../css/css-modals/add-branch.css';
import addBranch from '../../services/branchService';

const Add_Branch = ({ onClose, onAdd }) => {
    const [newBranch, setNewBranch] = useState({
        CN_Ten: '',
        CN_DiaChi: '',
        CN_TGMoCua: '07:00',
        CN_TGDongCua: '19:00',
        CN_SDT: '',
        CN_BaiDoXeMay: false,
        CN_BaiDoXeOto: false,
        CN_HoTroGiaoHang: true,
        CN_MaQuanLy: '',
        CN_MaKhuVuc: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = e.target.type === 'checkbox' ? e.target.checked : value;

        setNewBranch((prevBranch) => ({
            ...prevBranch,
            [name]: newValue,
        }));

        if (name === 'CN_MaQuanLy' && value.length < 10) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                CN_MaQuanLy: 'Mã quản lý phải có ít nhất 10 ký tự',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                CN_MaQuanLy: '',
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newBranch.CN_MaQuanLy.length < 10) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                CN_MaQuanLy: 'Mã quản lý phải có ít nhất 10 ký tự',
            }));
            return;
        }

        try {
            const branchWithId = {
                ...newBranch,
                CN_MaChiNhanh: generateBranchId(),
            };
            await addBranch(branchWithId);
            alert('Thêm chi nhánh thành công');
            onAdd(branchWithId);
            onClose();
        } catch (error) {
            console.error('Error adding branch:', error);
            alert('Failed to add branch');
        }
    };

    let branchCounter = 21;

    const generateBranchId = () => {
        const branchId = 'CN' + branchCounter.toString().padStart(3, '0');
        branchCounter++;
        return branchId;
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
                            <p><strong>Địa chỉ:</strong> <input type="text" name="CN_DiaChi" value={newBranch.CN_DiaChi} onChange={handleChange} required /></p>
                            <p><strong>Giờ mở cửa:</strong> <input type="time" name="CN_TGMoCua" value={newBranch.CN_TGMoCua} onChange={handleChange} required /></p>
                            <p><strong>Giờ đóng cửa:</strong> <input type="time" name="CN_TGDongCua" value={newBranch.CN_TGDongCua} onChange={handleChange} required /></p>
                            <p><strong>Số điện thoại:</strong> <input type="text" name="CN_SDT" value={newBranch.CN_SDT} onChange={handleChange} required /></p>
                            <p><strong>Có bãi xe máy:</strong> <input type="checkbox" name="CN_BaiDoXeMay" checked={newBranch.CN_BaiDoXeMay} onChange={handleChange} /></p>
                            <p><strong>Có bãi xe ô tô:</strong> <input type="checkbox" name="CN_BaiDoXeOto" checked={newBranch.CN_BaiDoXeOto} onChange={handleChange} /></p>
                            <p><strong>Có giao hàng:</strong> <input type="checkbox" name="CN_HoTroGiaoHang" checked={newBranch.CN_HoTroGiaoHang} onChange={handleChange} /></p>
                            <p>
                                <strong>Mã quản lý:</strong> 
                                <input type="text" name="CN_MaQuanLy" value={newBranch.CN_MaQuanLy} onChange={handleChange} required />
                                {errors.CN_MaQuanLy && <span className="error-message">{errors.CN_MaQuanLy}</span>}
                            </p>
                            <p><strong>Mã khu vực:</strong> <input type="text" name="CN_MaKhuVuc" value={newBranch.CN_MaKhuVuc} onChange={handleChange} required /></p>
                            <button type="submit" className="add-button">Thêm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Add_Branch;