import React, { useState } from 'react';
import '../css/css-modals/detail-customer.css';

const Detail_Customer = ({ item, onClose, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedCustomer, setUpdatedCustomer] = useState({ ...item });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    if (!item) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedCustomer(prev => ({
            ...prev,
            [name]: value,
        }));
        setError(null);
    };
    const handleDelete = async () => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/auth/user/${item.customerId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Xóa khách hàng thất bại');
            }

            alert('Xóa khách hàng thành công!');
            onDelete(); // Call onDelete to refresh parent component
            onClose(); // Close modal after successful deletion
            window.location.reload(); // Reload page
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const validateForm = () => {
        if (!updatedCustomer.name?.trim()) return 'Họ tên không được để trống';
        if (!updatedCustomer.cccd?.trim()) return 'CCCD không được để trống';
        if (!updatedCustomer.email?.trim()) return 'Email không được để trống';
        return null;
    };

    const updateCustomer = async (customer) => {
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return null;
        }
    
        try {
            const response = await fetch(`http://localhost:3000/api/auth/user/${customer.customerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    KH_SDT: customer.customerId, // Add ID to ensure correct customer update
                    KH_HoTen: customer.name,
                    KH_CCCD: customer.cccd,
                    KH_Email: customer.email,
                    KH_GioiTinh: customer.gender,
                    KH_MaTheThanhVien: customer.cardId
                }),
            });
    
            if (!response.ok) {
                throw new Error('Cập nhật thông tin thất bại');
            }
    
            const result = await response.json();
            alert('Cập nhật thông tin thành công!');
            return result;
        } catch (error) {
            setError(error.message);
            return null;
        }
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const result = await updateCustomer(updatedCustomer);
            
            if (result) {
                // Only update this specific customer
                const updatedData = {
                    ...updatedCustomer,
                    customerId: item.customerId, // Ensure we keep original ID
                    cardId: item.cardId,
                    createdDate: item.createdDate,
                    points: item.points,
                    yearOfUsing: item.yearOfUsing,
                    status: item.status,
                    membershipType: item.membershipType,
                    staffCreatorID: item.staffCreatorID
                };
    
                onUpdate(updatedData); // Pass updated data to parent
                setUpdatedCustomer(updatedData); // Update local state
                setIsEditing(false);
                
                // Refresh page to ensure consistent state
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            setError('Failed to update customer: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>CHI TIẾT KHÁCH HÀNG</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="modal-sections">
                    <div className="modal-section">
                        <h3>THÔNG TIN CÁ NHÂN</h3>
                        {isEditing ? (
                            <>
                                <p>
                                    <strong>Họ tên:</strong> 
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={updatedCustomer.name || ''} 
                                        onChange={handleChange}
                                        required 
                                    />
                                </p>
                                <p>
                                    <strong>Giới tính:</strong> 
                                    <select 
                                        name="gender" 
                                        value={updatedCustomer.gender || ''} 
                                        onChange={handleChange}
                                    >
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                    </select>
                                </p>
                                <p>
                                    <strong>Số CCCD:</strong> 
                                    <input 
                                        type="text" 
                                        name="cccd" 
                                        value={updatedCustomer.cccd || ''} 
                                        onChange={handleChange}
                                        required 
                                    />
                                </p>
                                <p>
                                    <strong>Email:</strong> 
                                    <input 
                                        type="email" 
                                        name="email" 
                                        value={updatedCustomer.email || ''} 
                                        onChange={handleChange}
                                        required 
                                    />
                                </p>
                                <button 
                                    className="save-button" 
                                    onClick={handleSave}
                                    disabled={loading}
                                >
                                    {loading ? 'Đang lưu...' : 'Lưu'}
                                </button>
                            </>
                        ) : (
                            <>
                                <p><strong>Họ tên:</strong> {updatedCustomer.name}</p>
                                <p><strong>Giới tính:</strong> {updatedCustomer.gender}</p>
                                <p><strong>Số CCCD:</strong> {updatedCustomer.cccd}</p>
                                <p><strong>Email:</strong> {updatedCustomer.email}</p>
                                {!isEditing && (
                                    <div className="button-group">
                                        <button 
                                            className="update-button" 
                                            onClick={() => setIsEditing(true)}
                                            disabled={loading}
                                        >
                                            Chỉnh sửa
                                        </button>
                                        <button 
                                            className="delete-button" 
                                            onClick={handleDelete}
                                            disabled={loading}
                                        >
                                            {loading ? 'Đang xóa...' : 'Xóa'}
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <div className="divider"></div>
                    <div className="modal-section">
                        <h3>THÔNG TIN THẺ</h3>
                        <p><strong>Mã thẻ:</strong> {item.cardId}</p>
                        <p><strong>Ngày tạo:</strong> {item.createdDate}</p>
                        <p><strong>Số năm sử dụng:</strong> {item.yearOfUsing}</p>
                        <p><strong>Điểm:</strong> {item.points}</p>
                        <p><strong>Tình trạng thẻ:</strong> {item.status}</p>
                        <p><strong>Loại thành viên:</strong> {item.membershipType}</p>
                        <p><strong>Số điện thoại:</strong> {item.customerId}</p>
                        <p><strong>Mã nhân viên tạo thẻ:</strong> {item.staffCreatorID}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail_Customer;