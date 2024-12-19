import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "../css/components/chart.css";

const monthlyData = [
    { period: 'Jan', customers: 400 },
    { period: 'Feb', customers: 300 },
    { period: 'Mar', customers: 200 },
    { period: 'Apr', customers: 278 },
    { period: 'May', customers: 189 },
    { period: 'Jun', customers: 239 },
    { period: 'Jul', customers: 349 },
    { period: 'Aug', customers: 489 },
    { period: 'Sep', customers: 378 },
    { period: 'Oct', customers: 439 },
    { period: 'Nov', customers: 500 },
    { period: 'Dec', customers: 600 },
];

const quarterlyData = [
    { period: 'Q1', customers: 900 },
    { period: 'Q2', customers: 706 },
    { period: 'Q3', customers: 1216 },
    { period: 'Q4', customers: 1539 },
];

const yearlyData = [
    { period: '2020', customers: 3500 },
    { period: '2021', customers: 4361 },
    { period: '2022', customers: 5278 },
    { period: '2023', customers: 5890 },
];

const CustomerChart = () => {
    const [viewType, setViewType] = useState('monthly');
    const [startDate, setStartDate] = useState('2024-01-01');
    const [endDate, setEndDate] = useState('2024-12-31');

    const getChartData = () => {
        switch (viewType) {
            case 'quarterly':
                return quarterlyData;
            case 'yearly':
                return yearlyData;
            default:
                return monthlyData;
        }
    };

    return (
        <div className="chart-container">
            <div className="chart-header">
                <div className="title-section">
                    <h2>Thống Kê Khách Hàng</h2>
                    <span className="date-range">
                        Từ: <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        Đến: <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </span>
                </div>
                <select
                    value={viewType}
                    onChange={(e) => setViewType(e.target.value)}
                    className="view-selector"
                >
                    <option value="monthly">Tháng</option>
                    <option value="quarterly">Quý</option>
                    <option value="yearly">Năm</option>
                </select>
            </div>
            <BarChart width={800} height={400} data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                <Bar dataKey="customers" fill="#ffcc66" />
            </BarChart>
        </div>
    );
};

export default CustomerChart;