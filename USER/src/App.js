import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/components/Home';
import Menu from './pages/components/Menu';
import BranchSearch from './pages/components/BranchSearch';
import About from './pages/components/AboutUs';
import CustomerInfo from './pages/components/CustomerInfo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/branch" element={<BranchSearch />} />
        <Route path="/about" element={<About />} />
        <Route path="/customerinfo" element={<CustomerInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
