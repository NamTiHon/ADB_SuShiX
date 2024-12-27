// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/components/Login';
import Home from './pages/components/Home';
import Mgmt_Branch from './pages/components/Mgmt_Branch';
import Mgmt_Dish from './pages/components/Mgmt_Dish';
import Mgmt_Staff from './pages/components/Mgmt_Staff';
import Mgmt_Customer from './pages/components/Mgmt_Customer';
import Mgmt_Booking from './pages/components/Mgmt_Booking';
import Mgmt_OnlineOrder from './pages/components/Mgmt_OnlineOrder';
import Staff_Add_Booking from './pages/components/Staff_Add_Booking';
import Bill from './pages/components/Bill';

function App() {
    return (
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/mgmt-branch" element={<Mgmt_Branch />} />
                    <Route path="/mgmt-dish" element={<Mgmt_Dish />} />
                    <Route path="/mgmt-staff" element={<Mgmt_Staff />} />
                    <Route path="/mgmt-customer" element={<Mgmt_Customer />} />
                    <Route path="/mgmt-booking" element={<Mgmt_Booking />} />
                    <Route path="/mgmt-online-order" element={<Mgmt_OnlineOrder />} />
                    <Route path="/staff-add-booking" element={<Staff_Add_Booking />} />
                    <Route path="/bill/:billIds" element={<Bill/>} />
                </Routes>
            </Router>
    );
}

export default App;
