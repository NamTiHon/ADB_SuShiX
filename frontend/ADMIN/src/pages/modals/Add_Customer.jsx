import React, { useState, useEffect, useMemo } from 'react';
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

    const [staffIds, setStaffIds] = useState([]); // List of all staff IDs
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    useEffect(() => {
        // Fetch all staff IDs from the server when the component mounts
        const fetchStaffIds = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/staffs');
                const data = await response.json();
                console.log('Fetched staff IDs:', data); // Debug log
                if (Array.isArray(data.staffs)) {
                    const ids = data.staffs.map(staff => staff.NV_MaNhanVien);
                    setStaffIds(ids);
                } else {
                    console.error('Expected an array of staff objects');
                }
            } catch (error) {
                console.error('Error fetching staff IDs:', error);
            }
        };
        fetchStaffIds();
    }, []);

    const filteredStaffIds = useMemo(() => {
        return staffIds.filter((id) => id.startsWith(searchTerm)).slice(0, 10);
    }, [staffIds, searchTerm]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCustomer((prevCustomer) => ({
            ...prevCustomer,
            [name]: value,
        }));

        if (name === 'staffId') {
            // Filter the staff IDs based on the input
            setSearchTerm(value);
            setShowDropdown(true);
        }
    };
    const handleSelect = (id) => {
        setNewCustomer((prevCustomer) => ({
            ...prevCustomer,
            staffId: id,
        }));
        setSearchTerm(id);
        setShowDropdown(false);
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
        };
        try {
            // Add customer
            const customerResponse = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customerWithCardInfo)
            });

            if (!customerResponse.ok) {
                throw new Error('Đã xảy ra lỗi khi thêm khách hàng');
            }

            const customerData = await customerResponse.json();

            // Add card
            const cardResponse = await fetch('http://localhost:3000/api/cards/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(card)
            });

            if (!cardResponse.ok) {
                // If adding card fails, delete the customer
                await fetch(`http://localhost:3000/api/customers/${customerData.id}`, {
                    method: 'DELETE'
                });
                throw new Error('Đã xảy ra lỗi khi thêm thẻ');
            }

            const cardData = await cardResponse.json();
            onAdd({ customer: customerData, card: cardData });
            alert('Thêm khách hàng và thẻ thành công');
            onClose();

        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
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
                        <p><strong>Mã nhân viên tạo:</strong> <input type="text" name="staffId" value={newCustomer.staffId} onChange={handleChange} required />
                        {showDropdown && filteredStaffIds.length > 0 && (
                                <ul className="staff-id-dropdown">
                                    {filteredStaffIds.map((id) => (
                                        <li key={id} onClick={() => handleSelect(id)}>
                                            {id}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </p>
                        <button type="submit" className="add-button">Thêm</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Add_Customer;