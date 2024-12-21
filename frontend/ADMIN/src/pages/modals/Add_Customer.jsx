import React, { useState } from 'react';
import '../css/css-modals/add-customer.css';

const Add_Customer = ({ onClose, onAdd }) => {
    const [newCustomer, setNewCustomer] = useState({
        KH_HoTen: '',
        KH_GioiTinh: '', 
        KH_CCCD: '',
        KH_Email: '',
        KH_SDT: '',
        KH_MatKhau: '123456',
        gender: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer((prevCustomer) => ({
            ...prevCustomer,
            [name]: value,
        }));
        // Kiểm tra độ dài của staffId
        if (name === 'staffId' && value.length !== 10) {
            setError('Mã nhân viên phải có đúng 10 chữ số');
        } else {
            setError('');
        }
    };
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newCustomer.staffId.length !== 10) {
            setError('Mã nhân viên phải có đúng 10 chữ số');
            return;
        }

        const customerWithCardInfo = {
            KH_HoTen: newCustomer.name,
            KH_GioiTinh: newCustomer.gender, // default to male
            KH_CCCD: newCustomer.cccd,
            KH_Email: newCustomer.email,
            KH_SDT: newCustomer.phoneNumber,
            KH_MatKhau: '123456',
        };
        const card = {
            MaThe: generateCardId(),
            NgayTao: new Date().toISOString().split('T')[0],
            LoaiThe: 'Membership',
            SDT_KH: newCustomer.phoneNumber,
            MaNhanVien: newCustomer.staffId,
        }
        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customerWithCardInfo)
            });
            console.log(customerWithCardInfo);
            if (response.ok) {
                const data = await response.json();
                onAdd(data);
                alert('Thêm khách hàng thành công');
                onClose();
            } else {
                alert('Đã xảy ra lỗi khi thêm khách hàng');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Đã xảy ra lỗi khi thêm khách hàng');
        }
        try {
            const response = await fetch('http://localhost:3000/api/cards/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(card)
            });
            console.log(card);
            if (response.ok) {
                const data = await response.json();
                onAdd(data);
                alert('Thêm thẻ thành công');
                onClose();
            } else {
                alert('Đã xảy ra lỗi khi thêm thẻ');
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('Đã xảy ra lỗi khi thêm thẻ');
        }
    };

    const generateCardId = () => {
        return 'C' + Math.floor(Math.random() * 10000000);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>THÊM KHÁCH HÀNG</h2>
                <form onSubmit={handleSubmit}>
                    <div className="modal-section">
                        <h3>THÔNG TIN CÁ NHÂN</h3>
                        <p><strong>Họ tên:</strong> <input type="text" name="name" value={newCustomer.name} onChange={handleChange} required /></p>
                        <p><strong>Giới tính:</strong>
                            <select name="gender" value={newCustomer.gender} onChange={handleChange} required>
                                <option value="" disabled>Chọn giới tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                        </p>
                        <p><strong>Số CCCD:</strong> <input type="text" name="cccd" value={newCustomer.cccd} onChange={handleChange} minLength="12" maxLength="12" required pattern="\d*" /></p>
                        <p><strong>Email:</strong> <input type="email" name="email" value={newCustomer.email} onChange={handleChange} required /></p>
                        <p><strong>Ngày sinh:</strong> <input type="date" name="dateOfBirth" value={newCustomer.dateOfBirth} onChange={handleChange} required /></p>
                        <p><strong>Số điện thoại:</strong> <input type="text" name="phoneNumber" value={newCustomer.phone} onChange={handleChange} required /></p>
                        {error && <p className="error-message">{error}</p>}
                        <p><strong>Mã nhân viên tạo:</strong> <input type="text" name="staffId" value={newCustomer.staffId} onChange={handleChange} required /></p>
                        <button type="submit" className="add-button">Thêm</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Add_Customer;