import { Navigate, useLocation, Outlet } from "react-router";
import { useAuth } from "../store/AuthContext"; // adjust the path as needed

const ProtectedRoute = () => {
    const { token } = useAuth();
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
