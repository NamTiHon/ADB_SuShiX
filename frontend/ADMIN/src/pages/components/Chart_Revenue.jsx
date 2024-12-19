import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "../css/components/chart.css";

const monthlyData = [
    { period: 'Jan', revenue: 4000 },
    { period: 'Feb', revenue: 3000 },
    { period: 'Mar', revenue: 2000 },
    { period: 'Apr', revenue: 2780 },
    { period: 'May', revenue: 1890 },
    { period: 'Jun', revenue: 2390 },
    { period: 'Jul', revenue: 3490 },
    { period: 'Aug', revenue: 4890 },
    { period: 'Sep', revenue: 3780 },
    { period: 'Oct', revenue: 4390 },
    { period: 'Nov', revenue: 5000 },
    { period: 'Dec', revenue: 6000 },
];

const quarterlyData = [
    { period: 'Q1', revenue: 9000 },
    { period: 'Q2', revenue: 7060 },
    { period: 'Q3', revenue: 12160 },
    { period: 'Q4', revenue: 15390 },
];

const yearlyData = [
    { period: '2020', revenue: 35000 },
    { period: '2021', revenue: 43610 },
    { period: '2022', revenue: 52780 },
    { period: '2023', revenue: 58900 },
];

const RevenueChart = () => {
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
                    <h2>Thống Kê Doanh Thu</h2>
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
                <Bar dataKey="revenue" fill="#99ccff" />
            </BarChart>
        </div>
    );
};

export default RevenueChart;