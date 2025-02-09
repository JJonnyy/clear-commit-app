import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Loading } from '../pages/Loading.jsx';


export function RequireAuth({ children, reverse = false }) {
    const { isAuthenticated, isLoading, isFirebaseAuth } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <Loading />;
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