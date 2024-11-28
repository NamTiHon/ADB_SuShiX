// BranchSearch.jsx
import React, { useState } from 'react';
import Nav from './Nav';
import '../css/branchsearch.css';

const BranchSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [district, setDistrict] = useState('');
    const [province, setProvince] = useState('');
    const [selectedBranch, setSelectedBranch] = useState(null);

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
            features: ["Có chỗ đỗ xe", "Wifi miễn phí", "Phòng VIP"]
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
            features: ["Sân vườn", "Phòng riêng", "Bãi đỗ xe rộng"]
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
            features: ["View Hồ Gươm", "Bar", "Phòng VIP"]
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
            features: ["Buffet trưa", "Khu vui chơi trẻ em", "Bãi đỗ xe"]
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
            features: ["Không gian rộng", "Wifi miễn phí", "Điều hòa"]
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
            features: ["View thành phố", "Bếp mở", "Phòng hội nghị"]
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

    const BranchDetailModal = ({ branch, onClose }) => {
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
                </div>
            </div>
        );
    };

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

                        {selectedBranch && (
                            <BranchDetailModal 
                                branch={selectedBranch} 
                                onClose={() => setSelectedBranch(null)}
                            />
                        )}
                    </div>
                </div>

                <div className="results-info">
                    <span>Tìm thấy {filteredBranches.length} chi nhánh</span>
                </div>

                <div className="branches-grid">
                    {filteredBranches.map(branch => (
                        <div key={branch.id} className="branch-card">
                            <div className="branch-image">
                                <img src={branch.image} alt={branch.name} />
                                <div className="rating">
                                    <span>{branch.rating}</span>
                                    <i className="fas fa-star"></i>
                                </div>
                            </div>
                            <div className="branch-info">
                                <h3>{branch.name}</h3>
                                <p><i className="fas fa-map-marker-alt"></i> {branch.address}</p>
                                <p><i className="fas fa-phone"></i> {branch.phone}</p>
                                <p><i className="fas fa-clock"></i> {branch.openHours}</p>
                                <div className="branch-features">
                                    {branch.features.map((feature, index) => (
                                        <span key={index} className="feature-tag">{feature}</span>
                                    ))}
                                </div>
                                <div className="branch-actions">
                                    <button 
                                        className="btn-primary"
                                        onClick={() => setSelectedBranch(branch)}
                                        
                                    >
                                        <i className="fas fa-info-circle"></i> Chi tiết
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
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BranchSearch;