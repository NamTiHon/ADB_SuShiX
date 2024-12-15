// BranchSearch.jsx
import React, { useState, useEffect } from 'react';
import { useBranch } from '../../context/BranchContext';
import { getBranches } from '../../services/branchService';
import Nav from './Nav';
import '../css/branchsearch.css';
const BranchSearch = () => {
    const [branchData, setBranchData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [district, setDistrict] = useState('');
    const [province, setProvince] = useState('');
    const { selectedBranch, setSelectedBranch } = useBranch();
    const [showOpenOnly, setShowOpenOnly] = useState(false);
    const [confirmBranch, setConfirmBranch] = useState(null);

  

   
    const handleGetDirections = (branchAddress) => {
        // Get user's current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const origin = `${position.coords.latitude},${position.coords.longitude}`;
                const destination = encodeURIComponent(branchAddress);
                const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
                window.open(mapsUrl, '_blank');
            }, () => {
                // Fallback if user denies location access
                const destination = encodeURIComponent(branchAddress);
                const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
                window.open(mapsUrl, '_blank');
            });
        } else {
            // Fallback for browsers that don't support geolocation
            const destination = encodeURIComponent(branchAddress);
            const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
            window.open(mapsUrl, '_blank');
        }
    };

    const handleBranchSelect = (branch) => {
        const isOpen = getBranchStatus(branch.openHours);
        
        if (!isOpen) {
            setConfirmBranch(branch);
        } else {
            setSelectedBranch(branch);
        }
    };


    // Function to check if branch is open
    const getBranchStatus = (openHours) => {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        
        const [open, close] = openHours.split(' - ').map(time => {
            const [hours, minutes] = time.split(':').map(Number);
            return hours * 60 + minutes;
        });

        return currentTime >= open && currentTime < close;
    };
  
    // Add isOpen status when rendering branches
    const renderBranchCard = (branch) => {
        const isOpen = getBranchStatus(branch.openHours);
        
        return (
            <div key={branch.id} className={`branch-card ${!isOpen ? 'closed' : ''}`}>
                <div className="branch-image">
                    <img src={branch.image} alt={branch.name} />
                    
                    <div className={`status-badge ${isOpen ? 'open' : 'closed'}`}>
                        {isOpen ? 'Đang mở cửa' : 'Đã đóng cửa'}
                    </div>
                </div>
                <div className="branch-info">
                    <h3>{branch.name}</h3>
                    <p><i className="fas fa-map-marker-alt"></i> {branch.address}</p>
                    <p><i className="fas fa-phone"></i> {branch.phone}</p>
                    <p>
                        <i className="fas fa-clock"></i> 
                        <span className={isOpen ? 'time-open' : 'time-closed'}>
                            {branch.openHours}
                        </span>
                    </p>
                    <div className="branch-features">
                        {branch.features.map((feature, index) => (
                            <span key={index} className="feature-tag">{feature}</span>
                        ))}
                    </div>
                    <div className="branch-actions">
                        
                        <button 
                            className={`select-branch ${branch.id === selectedBranch?.id ? 'selected' : ''}`}
                            onClick={() => handleBranchSelect(branch)}
                            disabled={branch.id === selectedBranch?.id}
                        >
                            {branch.id === selectedBranch?.id ? 'Chi nhánh hiện tại' : 'Chọn chi nhánh'}
                        </button>
                        <button 
                            className="btn-secondary"
                            onClick={() => handleGetDirections(branch.address)}
                        >
                            <i className="fas fa-map-marked-alt"></i> Chỉ đường
                        </button>
                    </div>
                </div>
            </div>
        );
    };
    
    useEffect(() => {
        const fetchBranchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3000/api/branches');
                const data = await response.json();
                console.log('API Response:', data); // Debug log
    
                // Transform data
                const branches = data.branches.map(branch => ({
                    id: branch.CN_MaChiNhanh,
                    name: branch.CN_Ten,
                    address: branch.CN_DiaChi,
                    district: branch.CN_MaKhuVuc,
                    phone: branch.CN_SDT,
                    openHours: `${branch.CN_TGMoCua.slice(0,5)} - ${branch.CN_TGDongCua.slice(0,5)}`,
                    features: [
                        branch.CN_BaiDoXeOto && "Bãi giữ xe ô tô",
                        branch.CN_BaiDoXeMay && "Bãi giữ xe máy",
                        branch.CN_HoTroGiaoHang && "Hỗ trợ giao hàng"
                    ].filter(Boolean)
                }));
    
                console.log('Transformed branches:', branches); // Debug log
                setBranchData(branches);
    
            } catch (err) {
                console.error('Fetch error:', err);
                // Fallback to default data if API fails
                setBranchData([
                    {
                        id: 'default1',
                        name: 'Chi nhánh mặc định',
                        address: '123 Đường ABC',
                        district: 'district1',
                        phone: '0123456789',
                        openHours: '08:00 - 22:00',
                        features: ['Bãi giữ xe máy']
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };
    
        fetchBranchData();
    }, []);
    const filteredBranches = (branchData || []).filter(branch => {
        // Skip invalid branches
        if (!branch || !branch.name || !branch.address) return false;
        
        const matchesSearch = searchTerm === '' || 
            branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            branch.address.toLowerCase().includes(searchTerm.toLowerCase());
            
        const matchesDistrict = !district || branch.district === district;
        
        return matchesSearch && matchesDistrict;
    });

    return (
        <div>
            <Nav />
            <div className="branch-search-container">
                {loading ? (
                    <div className="loading-state">
                        <i className="fas fa-spinner fa-spin"></i>
                        <p>Đang tải danh sách chi nhánh...</p>
                    </div>
                ) : error ? (
                    <div className="error-state">
                        <i className="fas fa-exclamation-circle"></i>
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()}>Thử lại</button>
                    </div>
                ) : (
                    <div>
                        <div className="search-header">
                            <h1>Tìm chi nhánh</h1>
                            <p>Tìm chi nhánh SuShiX gần bạn</p>
                        </div>
                        <div className="search-filters">
                            <div className="search-input-b">
                                <i className="fas fa-search"></i>
                                <input
                                    type="text"
                                    placeholder="Tìm theo tên hoặc địa chỉ..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                          
                        </div>

                        <div className="status-filter">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={showOpenOnly}
                                    onChange={(e) => setShowOpenOnly(e.target.checked)}
                                />
                                Chỉ hiện chi nhánh đang mở cửa
                            </label>
                        </div>

                        <div className="results-info">
                            <span>Tìm thấy {filteredBranches.length} chi nhánh</span>
                        </div>

                        <div className="branches-grid">
                            {filteredBranches
                                .filter(branch => !showOpenOnly || getBranchStatus(branch.openHours))
                                .map(renderBranchCard)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};



export default BranchSearch;