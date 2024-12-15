// BranchSearch.jsx
import React, { useState, useEffect } from 'react'; // Add useEffect
import { useBranch } from '../../context/BranchContext';
import Nav from './Nav';
import '../css/branchsearch.css';

const BranchSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [district, setDistrict] = useState('');
    const [province, setProvince] = useState('');
    const [modalBranch, setModalBranch] = useState(null);
    const { selectedBranch, setSelectedBranch } = useBranch();
    const [showOpenOnly, setShowOpenOnly] = useState(false);
    const [confirmBranch, setConfirmBranch] = useState(null);

    const locations = {
        hanoi: {
            name: "Hà Nội",
            districts: [
                { id: 'dongda', name: 'Đống Đa' },
                { id: 'caugiay', name: 'Cầu Giấy' },
                { id: 'hoankiem', name: 'Hoàn Kiếm' },
                { id: 'longbien', name: 'Long Biên' },
                { id: 'hadong', name: 'Hà Đông' }
            ]
        },
        hochiminh: {
            name: "TP. Hồ Chí Minh",
            districts: [
                { id: 'district1', name: 'Quận 1' },
                { id: 'district3', name: 'Quận 3' },
                { id: 'district5', name: 'Quận 5' },
                { id: 'phunhuan', name: 'Phú Nhuận' },
                { id: 'binhtan', name: 'Bình Tân' }
            ]
        },
        danang: {
            name: "Đà Nẵng",
            districts: [
                { id: 'haichau', name: 'Hải Châu' },
                { id: 'sontra', name: 'Sơn Trà' },
                { id: 'nguhanhson', name: 'Ngũ Hành Sơn' }
            ]
        }
    };
    const districts = [
        { id: 'dongda', name: 'Đống Đa' },
        { id: 'caugiay', name: 'Cầu Giấy' },
        { id: 'hoankiem', name: 'Hoàn Kiếm' },
        { id: 'longbien', name: 'Long Biên' },
        { id: 'hadong', name: 'Hà Đông' }
    ];
    const branches = [
        {
            id: 1,
            name: "SuShiX Đống Đa",
            address: "123 Đống Đa, Hà Nội",
            district: "dongda",
            phone: "024.1234.5678",
            rating: 4.5,
            openHours: "10:00 - 22:00",
            image: "/images/branch1.jpg",
            features: ["Bãi giữ xe ô tô", "Bãi giữ xe máy", "Hỗ trợ giao hàng"]
        },
        {
            id: 2,
            name: "SuShiX Cầu Giấy",
            address: "45 Cầu Giấy, Hà Nội",
            district: "caugiay",
            phone: "024.9876.5432",
            rating: 4.7,
            openHours: "10:00 - 23:00",
            image: "/images/branch2.jpg",
            features: ["Bãi giữ xe ô tô", "Bãi giữ xe máy", "Hỗ trợ giao hàng"]
        },
        {
            id: 3,
            name: "SuShiX Hoàn Kiếm",
            address: "67 Hàng Bông, Hoàn Kiếm, Hà Nội",
            district: "hoankiem",
            phone: "024.6543.2109",
            rating: 4.8,
            openHours: "09:00 - 22:30",
            image: "/images/branch3.jpg",
            features: ["Bãi giữ xe ô tô", "Bãi giữ xe máy", "Hỗ trợ giao hàng"]
        },
        {
            id: 4,
            name: "SuShiX Long Biên",
            address: "89 Nguyễn Văn Cừ, Long Biên, Hà Nội",
            district: "longbien",
            phone: "024.8765.4321",
            rating: 4.6,
            openHours: "10:30 - 22:00",
            image: "/images/branch4.jpg",
            features: ["Bãi giữ xe ô tô", "Bãi giữ xe máy", "Hỗ trợ giao hàng"]
        },
        {
            id: 5,
            name: "SuShiX Hà Đông",
            address: "234 Quang Trung, Hà Đông, Hà Nội",
            district: "hadong",
            phone: "024.3456.7890",
            rating: 4.4,
            openHours: "10:00 - 21:30",
            image: "/images/branch5.jpg",
            features: ["Bãi giữ xe ô tô", "Bãi giữ xe máy", "Hỗ trợ giao hàng"]
        },
        {
            id: 6,
            name: "SuShiX Times City",
            address: "458 Minh Khai, Hai Bà Trưng, Hà Nội",
            district: "dongda",
            phone: "024.2345.6789",
            rating: 4.9,
            openHours: "09:30 - 22:00",
            image: "/images/branch6.jpg",
            features: ["Bãi giữ xe ô tô", "Bãi giữ xe máy", "Hỗ trợ giao hàng"]
        }
    ];

    const filteredBranches = branches.filter(branch => {
        const matchesSearch = branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            branch.address.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDistrict = district ? branch.district === district : true;
        return matchesSearch && matchesDistrict;
    });
    
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

    const showBranchDetails = (branch) => {
        setModalBranch(branch);
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
    const handleConfirmBranch = () => {
        if (confirmBranch) {
            setSelectedBranch(confirmBranch);
            setConfirmBranch(null);
        }
    };

    const handleCancelBranch = () => {
        setConfirmBranch(null);
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
    const ConfirmClosedBranchModal = ({ branch, onConfirm, onCancel }) => {
        return (
            <div className="modal-overlay" onClick={onCancel}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <h3>Xác nhận chọn chi nhánh</h3>
                    <p>Chi nhánh {branch.name} hiện đang đóng cửa.</p>
                    <p>Bạn vẫn muốn chọn chi nhánh này?</p>
                    <div className="modal-actions">
                        <button className="btn-secondary" onClick={onCancel}>
                            Hủy bỏ
                        </button>
                        <button className="btn-primary" onClick={onConfirm}>
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        );
    };
    useEffect(() => {
        const savedBranch = localStorage.getItem('selectedBranch');
        if (savedBranch) {
            setSelectedBranch(JSON.parse(savedBranch));
        }
    }, []);

    // Save branch when it changes
    useEffect(() => {
        if (selectedBranch) {
            localStorage.setItem('selectedBranch', JSON.stringify(selectedBranch));
        }
    }, [selectedBranch]);
    return (
        <div>
            <Nav />
            <div className="branch-search-container">
            <div className="search-header">
                <h1>Tìm chi nhánh</h1>
                <p>Tìm chi nhánh SuShiX gần bạn</p>

            </div>
                <div className="search-filters">
                    <div className="search-input">
                        <i className="fas fa-search"></i>
                        <input
                            type="text"
                            placeholder="Tìm theo tên hoặc địa chỉ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="location-filters">
                        <select 
                            value={province}
                            onChange={(e) => {
                                setProvince(e.target.value);
                                setDistrict(''); // Reset district when province changes
                            }}
                            className="filter-select"
                        >
                            <option value="">Chọn tỉnh/thành phố</option>
                            {Object.keys(locations).map(key => (
                                <option key={key} value={key}>
                                    {locations[key].name}
                                </option>
                            ))}
                        </select>

                        {province && (
                            <select 
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                className="filter-select"
                            >
                                <option value="">Tất cả quận/huyện</option>
                                {locations[province].districts.map(dist => (
                                    <option key={dist.id} value={dist.id}>
                                        {dist.name}
                                    </option>
                                ))}
                            </select>
                        )}

                        {confirmBranch && (
                            <ConfirmClosedBranchModal
                                branch={confirmBranch}
                                onConfirm={handleConfirmBranch}
                                onCancel={handleCancelBranch}
                            />
                        )}
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
        </div>
    );
};

// Update BranchDetailModal to include selection button
const BranchDetailModal = ({ branch, onClose, onSelect }) => {
    if (!branch) return null;
    
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>
                
                <div className="modal-body">
                    <div className="modal-image">
                        <img src={branch.image} alt={branch.name} />
                        <div className="rating">
                            <span>{branch.rating}</span>
                            <i className="fas fa-star"></i>
                        </div>
                    </div>
                    
                    <div className="modal-info">
                        <h2>{branch.name}</h2>
                        <div className="info-grid">
                            <div className="info-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <p>{branch.address}</p>
                            </div>
                            <div className="info-item">
                                <i className="fas fa-phone"></i>
                                <p>{branch.phone}</p>
                            </div>
                            <div className="info-item">
                                <i className="fas fa-clock"></i>
                                <p>{branch.openHours}</p>
                            </div>
                        </div>
                        
                        <div className="features-section">
                            <h3>Tiện ích</h3>
                            <div className="features-grid">
                                {branch.features.map((feature, index) => (
                                    <div key={index} className="feature-item">
                                        <span className="feature-tag">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-actions">
                    <button className="btn-primary" onClick={onSelect}>
                        <i className="fas fa-check-circle"></i> Chọn chi nhánh này
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BranchSearch;