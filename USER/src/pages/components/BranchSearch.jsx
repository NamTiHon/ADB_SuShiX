import React from 'react';
import '../css/branchsearch.css';
import lvv from '../img/sushi.jpg';

const BranchItem = ({ branch }) => {
    return (
        <div className="branch-item">
            <img src={lvv} alt={branch.name} />
            <h2 className="branch-name">{branch.name}</h2>
            <p className="branch-status">{branch.status}</p>
        </div>
    );
}

const BranchSearch = () => {
    const branches = [
        { name: '123 Lê Văn Việt', status: 'Đang mở' }
    ];

    return (
        <div>
            <h1>Hệ thống chi nhánh</h1>

            <div className="filter-container">
                <div className="filter-left">
                    <h2>Bộ lọc tìm kiếm</h2>
                    <p>Tỉnh</p>
                    <p>Quận</p>
                </div>
                <div className="filter-right">
                    <h2>Sắp xếp</h2>
                    <p>Phổ biến</p>
                </div>
            </div>
            <div className="branch-list">
                {branches.map((branch, index) => (
                    <BranchItem key={index} branch={branch} />
                ))}
            </div>
        </div>
    );
}

export default BranchSearch;