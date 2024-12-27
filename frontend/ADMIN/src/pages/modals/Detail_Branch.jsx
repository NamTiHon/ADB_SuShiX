import React, { useState } from 'react';
import '../css/css-modals/detail-booking.css';

const Detail_Branch = ({ item, onClose, onUpdate, onDelete, fields }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedBranch, setUpdatedBranch] = useState({ ...item });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    if (!item) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBranch((prevBranch) => ({
            ...prevBranch,
            [name]: value,
        }));
    };

    const handleDeleteClick = async () => {
        // Log branch data for debugging
        console.log('Branch data:', item);
        
        // Check if branch ID exists and is valid
        if (!item || !item.branchId) {
            setError('Invalid branch ID - missing branchId property');
            alert('Cannot delete: Invalid branch ID');
            return;
        }
    
        const confirmDelete = window.confirm(
            `Bạn có chắc chắn muốn xoá chi nhánh ${item.CN_Ten} (${item.branchId})?`
        );
    
        if (confirmDelete) {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:3000/api/branches/${item.branchId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to delete branch');
                }
    
                onDelete(item);
                onClose();
                alert('Xóa chi nhánh thành công');
                window.location.reload();
            } catch (error) {
                console.error('Delete error:', error);
                setError(error.message);
                alert(`Lỗi khi xóa chi nhánh: ${error.message}`);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSave = async () => {
        // Map display fields to database columns
        const fieldMapping = {
            branchId: 'CN_MaChiNhanh',
            name: 'CN_Ten',
            address: 'CN_DiaChi',
            openingTime: 'CN_TGMoCua',
            closingTime: 'CN_TGDongCua',
            phone: 'CN_SDT',
            hasMotorParking: 'CN_BaiDoXeMay',
            hasCarParking: 'CN_BaiDoXeOto',
            hasDelivery: 'CN_HoTroGiaoHang',
            managerId: 'CN_MaQuanLy',
            regionId: 'CN_MaKhuVuc'
        };
    
        // Format time values
        const formatTime = (time) => {
            if (!time) return null;
            return `${time}:00`;
        };
    
        // Map updated branch data to database format with proper time formatting
        const mappedData = {
            CN_MaChiNhanh: item.branchId,
            CN_Ten: updatedBranch.name,
            CN_DiaChi: updatedBranch.address,
            CN_TGMoCua: formatTime(updatedBranch.openingTime),
            CN_TGDongCua: formatTime(updatedBranch.closingTime),
            CN_SDT: updatedBranch.phone,
            CN_BaiDoXeMay: updatedBranch.hasMotorParking === true || updatedBranch.hasMotorParking === 'true',
            CN_BaiDoXeOto: updatedBranch.hasCarParking === true || updatedBranch.hasCarParking === 'true',
            CN_HoTroGiaoHang: updatedBranch.hasDelivery === true || updatedBranch.hasDelivery === 'true',
            CN_MaQuanLy: updatedBranch.managerId,
            CN_MaKhuVuc: updatedBranch.regionId
        };
    
        if (!mappedData.CN_MaChiNhanh) {
            setError('Cannot update: Missing branch ID');
            alert('Cannot update: Missing branch ID');
            return;
        }
    
        setLoading(true);
        try {
            console.log('Updating branch with data:', mappedData);
    
            const response = await fetch(`http://localhost:3000/api/branches/${mappedData.CN_MaChiNhanh}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(mappedData)
            });
    
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update branch');
            }
    
            onUpdate(data.branch);
            setIsEditing(false);
            alert('Cập nhật chi nhánh thành công');
            window.location.reload();
        } catch (error) {
            console.error('Update error:', error);
            setError(error.message);
            alert(`Lỗi khi cập nhật chi nhánh: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>CHI TIẾT</h2>
                <div className="modal-sections">
                    <div className="modal-section">
                        {isEditing ? (
                            <>
                                {fields.map((field) => (
                                    <p key={field.name}>
                                        <strong>{field.label}:</strong>
                                        {field.editable ? (
                                            typeof item[field.name] === 'boolean' ? (
                                                <input
                                                    type="checkbox"
                                                    name={field.name}
                                                    checked={updatedBranch[field.name]}
                                                    onChange={(e) => handleChange({ target: { name: field.name, value: e.target.checked } })}
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    name={field.name}
                                                    value={updatedBranch[field.name]}
                                                    onChange={handleChange}
                                                />
                                            )
                                        ) : (
                                            <span>{typeof item[field.name] === 'boolean' ? (item[field.name] ? 'Có' : 'Không') : item[field.name]}</span>
                                        )}
                                    </p>
                                ))}
                                <button className="save-button" onClick={handleSave}>Lưu</button>
                            </>
                        ) : (
                            <>
                                {fields.map((field) => (
                                    <p key={field.name}>
                                        <strong>{field.label}:</strong> {typeof item[field.name] === 'boolean' ? (item[field.name] ? 'Có' : 'Không') : item[field.name]}
                                    </p>
                                ))}
                                 {error && <div className="error-message">{error}</div>}
                                <div className="buttons">
                                    <button 
                                        className="update-button" 
                                        onClick={() => setIsEditing(true)}
                                        disabled={loading}
                                    >
                                        Chỉnh sửa
                                    </button>
                                    <button 
                                        className="cancel-button" 
                                        onClick={handleDeleteClick}
                                        disabled={loading}
                                    >
                                        {loading ? 'Đang xóa...' : 'Xóa'}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail_Branch;