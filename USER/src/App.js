import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/components/Home';
import Menu from './pages/components/Menu';
import Login from './pages/components/Login';
import BranchSearch from './pages/components/BranchSearch';
import CustomerInfo from './pages/components/CustomerInfo';
import { UserProvider } from './context/UserContext';
import Profile from './pages/components/Profile';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/branch" element={<BranchSearch />} />
          <Route path="/customer-info" element={<CustomerInfo />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
