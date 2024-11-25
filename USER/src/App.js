import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/components/Home';
import Menu from './pages/components/Menu';
import Login from './pages/components/Login';
import BranchSearch from './pages/components/BranchSearch';
import CustomerInfo from './pages/components/CustomerInfo';
import { UserProvider } from './context/UserContext';
import Profile from './pages/components/Profile';
import { CartProvider } from './context/CartContext';
import Cart from './pages/components/Cart';


function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/branch" element={<BranchSearch />} />
            <Route path="/customer-info" element={<CustomerInfo />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
