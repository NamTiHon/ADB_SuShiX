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
import About  from './pages/components/AboutUs';
import MessengerIcon from './pages/components/MessengerIcon';
import Notifications from './pages/components/Notifications';
import Checkout from './pages/components/Checkout';
import OrderConfirmation from './pages/components/OrderComfirmation';
import OrderSuccess from './pages/components/OrderSuccess';
import OrderTracking from './pages/components/OrderTracking';
import Reservation from './pages/components/Reservation';
import ReservationSuccess from './pages/components/ReservationSuccess';
import TableSelection from './pages/components/TableSelection';
import PrivateRoute from './pages/components/PrivateRoute';
import { BranchProvider } from './context/BranchContext';
import OrderManagement from './pages/components/OrderManagement';
import OrderDetails from './pages/components/OrderDetails'; // Import OrderDetails
import RateOrder from './pages/components/RateOrder'; // Import RateOrder

function App() {
  return (
    <BranchProvider>
      <UserProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/login" element={<Login />} />
              <Route path="/branch-search" element={<BranchSearch />} />
              <Route path="/customer-info" element={<CustomerInfo />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={
                  <PrivateRoute>
                      <Cart />
                  </PrivateRoute>
              } />
              <Route path="/about" element={<About />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/order-tracking" element={<OrderTracking />} />
              <Route path="/reservation" element={
                  <PrivateRoute>
                      <Reservation />
                  </PrivateRoute>
              } />
              <Route path="/table-selection" element={<TableSelection />} />
              <Route path="/reservation-success" element={<ReservationSuccess />} />
              <Route path="/order-management" element={<OrderManagement />} />
              <Route path="/order-details/:orderId" element={<OrderDetails />} /> {/* Add this route */}
              <Route path="/rate-order/:orderId" element={<RateOrder />} /> {/* Add this route */}
            </Routes>
            <MessengerIcon />
          </Router>
        </CartProvider>
      </UserProvider>
    </BranchProvider>
    
  );
}

export default App;
