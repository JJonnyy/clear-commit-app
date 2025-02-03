import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';


export function RequireAuth({ children, reverse = false }) {
    const { isAuthenticated, isLoading, isFirebaseAuth } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <div className="loader">Loading...</div>;
    }

    const isAuthorized = isAuthenticated || isFirebaseAuth;

    if (reverse){
        return isAuthorized ? (
            <Navigate to="/home" state={{ from: location }} replace />
        ) : (
            children
        );
    }

    return isAuthorized ? (
        children
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );

}