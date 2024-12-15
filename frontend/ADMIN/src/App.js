// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdminLogin from './pages/components/AdminLogin';
import Home from './pages/components/Home';
import StaffMgmt from './pages/components/StaffMgmt';
import CustomerMgmt from './pages/components/CustomerMgmt';
import TableBookMgmt from './pages/components/TableBookMgmt';
import OnlineOrderMgmt from './pages/components/OnlineOrderMgmt';

function App() {
    return (
            <Router>
                <Routes>
                    <Route path="/login" element={<AdminLogin />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/staff-mgmt" element={<StaffMgmt />} />
                    <Route path="/customer-mgmt" element={<CustomerMgmt />} />
                    <Route path="/table-book-mgmt" element={<TableBookMgmt />} />
                    <Route path="/online-order-mgmt" element={<OnlineOrderMgmt />} />
                </Routes>
            </Router>
    );
}

export default App;
