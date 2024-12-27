import React, { useState, useEffect, useMemo } from 'react';
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
        CN_MaKhuVuc: '',
        CN_MaHinhAnh: '',
    });
    const [staffIds, setStaffIds] = useState([]); // List of all staff IDs
    const [searchTerm, setSearchTerm] = useState('');
    const [regions, setRegions] = useState([]);
    const [searchRegionTerm, setSearchRegionTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [showRegionDropdown, setShowRegionDropdown] = useState(false);
    const [errors ] = useState({});
    const [branchCounter, setBranchCounter] = useState(0);


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


    useEffect(() => {
        // Fetch all regions from the server when the component mounts
        const fetchRegions = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/branches/regions');
                const data = await response.json();
                console.log('Fetched regions:', data); // Debug log
                if (Array.isArray(data.regions)) {
                    setRegions(data.regions);
                } else {
                    console.error('Expected an array of region objects');
                }
            } catch (error) {
                console.error('Error fetching regions:', error);
            }
        };
        fetchRegions();
    }, []);

    const filteredRegions = useMemo(() => {
        return regions.filter((region) => region.KV_MaKhuVuc.startsWith(searchRegionTerm)).slice(0, 10);
    }, [regions, searchRegionTerm]);

    useEffect(() => {
        // Fetch the number of branches from the server when the component mounts
        const fetchBranchCount = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/branches');
                const data = await response.json();
                console.log('Fetched branch count:', data.branches.length); // Debug log
                setBranchCounter(data.branches.length +1);
            } catch (error) {
                console.error('Error fetching branch count:', error);
            }
        };
        fetchBranchCount();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = e.target.type === 'checkbox' ? e.target.checked : value;

        setNewBranch((prevBranch) => ({
            ...prevBranch,
            [name]: newValue,
        }));

        if (name === 'CN_MaQuanLy') {
            setSearchTerm(value);
            setShowDropdown(true);
        }

        if (name === 'CN_MaKhuVuc') {
            setSearchRegionTerm(value);
            setShowRegionDropdown(true);
        }
    };

    const handleSelect = (id) => {
        setNewBranch((prevBranch) => ({
            ...prevBranch,
            CN_MaQuanLy: id,
        }));
        setSearchTerm('');
        setShowDropdown(false);
    };

    const handleSelectRegion = (region) => {
        setNewBranch((prevBranch) => ({
            ...prevBranch,
            CN_MaKhuVuc: region.KV_MaKhuVuc,
        }));
        setSearchRegionTerm('');
        setShowRegionDropdown(false);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const branchWithId = {
                ...newBranch,
                CN_MaChiNhanh: generateBranchId(),
                CN_TGMoCua: convertToDateTime(newBranch.CN_TGMoCua),
                CN_TGDongCua: convertToDateTime(newBranch.CN_TGDongCua),
            };
            console.log('Adding branch:', branchWithId);
            await addBranch(branchWithId);
            alert('Thêm chi nhánh thành công');
            onAdd(branchWithId);
            onClose();
        } catch (error) {
            console.error('Error adding branch:', error);
            alert('Failed to add branch');
        }
    };

    const generateBranchId = () => {
        const randomNum = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
        const branchId = 'CN' + randomNum.toString().padStart(3, '0');
        return branchId;
    };

    const convertToDateTime = (time) => {
        const [hours, minutes] = time.split(':');
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date.toISOString();
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
                            <p><strong>Tên chi nhánh:</strong> <input type="text" name="CN_Ten" value={newBranch.CN_Ten} onChange={handleChange} required /></p>
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
                            <p><strong>Mã khu vực:</strong> <input type="text" name="CN_MaKhuVuc" value={newBranch.CN_MaKhuVuc} onChange={handleChange} required />
                            {showRegionDropdown && filteredRegions.length > 0 && (
                                    <ul className="region-dropdown">
                                        {filteredRegions.map((region) => (
                                            <li key={region.KV_MaKhuVuc} onClick={() => handleSelectRegion(region)}>
                                                {region.KV_MaKhuVuc}-{region.KV_Ten}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </p>
                            <p><strong>Hình ảnh:</strong> (Link hình ảnh rút gọn) </p>
                            <input type="text" name="CN_MaHinhAnh" checked={newBranch.CN_MaHinhAnh} onChange={handleChange} />
                            <button type="submit" className="add-button">Thêm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Add_Branch;