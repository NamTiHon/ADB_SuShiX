// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes  from './routes/AdminRoutes';
function App() {
    return (
            <Router>
                <Routes>
                    <Route path="/admin/*" element={<AdminRoutes />} />
                    <Route path="/user/*" element={<UserRoutes />} />
                </Routes>
            </Router>
    );
}

export default App;
