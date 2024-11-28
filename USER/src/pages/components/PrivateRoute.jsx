import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const PrivateRoute = ({ children }) => {
    const { user } = useContext(UserContext);
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location.pathname }} />;
    }

    return children;
};

export default PrivateRoute;