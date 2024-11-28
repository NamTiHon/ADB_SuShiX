import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user')); // Or however you store user data

    if (!user) {
        // Redirect to login with return url
        return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
    }

    return children;
};

export default PrivateRoute;