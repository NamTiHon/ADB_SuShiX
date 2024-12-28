import React, { useState, useEffect } from 'react';
import SideBarTemp from './sideBarTemp';
import SideBar from './Sidebar';    
import Nav from './Nav';
import Chart_Revenue from "./Chart_Revenue";
import Chart_Customer from "./Chart_Customer";
import '../css/components/home.css';

function Home() {
    const isUserAuth = localStorage.getItem('userAuth') === 'true';

    // Get current month and year
    const currentMonth = new Date().getMonth() + 1; // Months are zero-based in JavaScript
    const currentYear = new Date().getFullYear();

    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);
    const [branchId, setBranchId] = useState('');
    const [branches, setBranches] = useState([]);
    const [revenue, setRevenue] = useState(null);
    const [branchRevenue, setBranchRevenue] = useState(null);
    const [customerCount, setCustomerCount] = useState(null);
    const [error, setError] = useState('');

    const handleFetchRevenue = async () => {
        setError('');
        setRevenue(null);

        if (!month || !year) {
            setError('Please enter both month and year.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/home/monthly-revenue?month=${month}&year=${year}`);
            if (!response.ok) {
                throw new Error('Failed to fetch revenue');
            }
            const data = await response.json();
            setRevenue(data.revenue);
        } catch (error) {
            console.error('Error fetching revenue:', error);
            setError('Error fetching revenue. Please try again.');
        }
    };

    const handleFetchBranchRevenue = async () => {
        setError('');
        setBranchRevenue(null);

        if (!branchId || !month || !year) {
            setError('Please select a branch and enter both month and year.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/home/branch-revenue?branchId=${branchId}&month=${month}&year=${year}`);
            if (!response.ok) {
                throw new Error('Failed to fetch branch revenue');
            }
            const data = await response.json();
            setBranchRevenue(data.revenue);
        } catch (error) {
            console.error('Error fetching branch revenue:', error);
            setError('Error fetching branch revenue. Please try again.');
        }
    };

    const handleFetchCustomerCount = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/home/total-customers');
            if (!response.ok) {
                throw new Error('Failed to fetch total customers');
            }
            const data = await response.json();
            setCustomerCount(data.count);
        } catch (error) {
            console.error('Error fetching total customers:', error);
            setError('Error fetching total customers. Please try again.');
        }
    };

    const handleFetchBranches = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/branches');
            if (!response.ok) {
                throw new Error('Failed to fetch branches');
            }
            const data = await response.json();
            console.log(data.branches);
            if (Array.isArray(data.branches)) {
                setBranches(data.branches);
            } else {
                setBranches([]);
            }
        } catch (error) {
            console.error('Error fetching branches:', error);
            setError('Error fetching branches. Please try again.');
        }
    };

    useEffect(() => {
        handleFetchRevenue();
        handleFetchCustomerCount();
        handleFetchBranches();
    }, [month, year]);

    useEffect(() => {
        if (branchId) {
            handleFetchBranchRevenue();
        }
    }, [branchId, month, year]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    return (
        <div className="home-page">
            <Nav />
            <div className="page-container">
                {isUserAuth ? <SideBarTemp /> : <SideBar />}
                <div className="main-content-box">
                    <h1>Chào mừng {isUserAuth ? 'bạn' : 'Admin'}!</h1>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        {/* <Chart_Revenue />
                        <Chart_Customer /> */}
                    </div>
                    <div className="stats-container">
                        <div className="form-and-revenue-container">
                            <div className="revenue-form">
                                <h2>THỐNG KÊ DOANH THU THEO THÁNG VÀ NĂM</h2>
                                <form onSubmit={(e) => { e.preventDefault(); handleFetchRevenue(); }}>
                                    <div className="form-group">
                                        <div className="temp">
                                            <label>Tháng:</label>
                                            <input
                                                type="number"
                                                value={month}
                                                onChange={(e) => setMonth(e.target.value)}
                                                min="1"
                                                max="12"
                                                required
                                            />
                                        </div>
                                        <div className="temp">
                                            <label>Năm:</label>
                                            <input
                                                type="number"
                                                value={year}
                                                onChange={(e) => setYear(e.target.value)}
                                                min="2000"
                                                max={new Date().getFullYear()}
                                                required
                                            />
                                        </div>
                                    </div>
                                </form>
                                {error && <p className="error-message">{error}</p>}
                            </div>
                            {revenue !== null && (
                                <div className="revenue-result">
                                    <h3>Doanh thu trong {month}/{year}:</h3>
                                    <p>{formatCurrency(revenue)}</p>
                                </div>
                            )}
                        </div>
                        <div className="customer-count">
                            <h2>THỐNG KÊ SỐ LƯỢNG KHÁCH HÀNG TRÊN HỆ THỐNG</h2>
                            {customerCount !== null ? (
                                <p>{customerCount} khách hàng</p>
                            ) : (
                                <p>Đang tải...</p>
                            )}
                        </div>
                    </div>
                    <div className="branch-revenue-form">
                        <h2>THỐNG KÊ DOANH THU THEO CHI NHÁNH</h2>
                        <div className="form-group">
                            <div >
                                <label>Chi Nhánh:</label>
                                <select
                                    value={branchId}
                                    onChange={(e) => setBranchId(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Chọn chi nhánh</option>
                                    {Array.isArray(branches) && branches.map(branch => (
                                        <option key={branch.CN_MaChiNhanh} value={branch.CN_MaChiNhanh}>
                                            {branch.CN_MaChiNhanh} - {branch.CN_Ten}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        {branchRevenue !== null && (
                            <div className="revenue-result">
                                <h3>Doanh thu của chi nhánh {branchId} trong {month}/{year}:</h3>
                                <p>{formatCurrency(branchRevenue)}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;