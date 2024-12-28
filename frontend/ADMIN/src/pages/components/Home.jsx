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
    const [revenue, setRevenue] = useState(null);
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

    useEffect(() => {
        handleFetchRevenue();
    }, [month, year]);

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
                    <div className="revenue-form">
                        <h2>THỐNG KÊ DOANH THU THEO THÁNG VÀ NĂM</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleFetchRevenue(); }}>
                            <div className="form-group">
                                <div>
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
                                <div>
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
                        {revenue !== null && (
                            <div className="revenue-result">
                                <h3>Doanh thu trong {month}/{year}:</h3>
                                <p>{formatCurrency(revenue)}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;