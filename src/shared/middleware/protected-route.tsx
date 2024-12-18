import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../shared/utils/services/tokenService';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    const checkAuth = async () => {
        setIsLoading(true);
        const authStatus = await isAuthenticated();
        setIsAuth(authStatus);
        setIsLoading(false);
    }
    
    useEffect(() => {
        checkAuth()
    }, [])

    if (!isAuth && !isLoading) {
        return <Navigate to="/auth/login" replace />;
    }
    else {
        return <>{children}</>;
    }

};

export default ProtectedRoute;