import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLanding from '../pages/AuthLanding'
import UserDashboard from '../pages/UserDashboard'
import AdminDashboard from '../pages/AdminDashboard';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { OAuthSuccess } from '../context/OAthSuccess';
import ProtectedRoute from '../components/ProtectedRoute';
import RoleProtectedRoute from '../components/RoleProtectedRoute';

const AppRoutes = () => {
    const { token, user } = useContext(AuthContext);

    return (

        <Routes>
            {/* Public route */}
            <Route
                path="/"
                element={
                    token ? (
                        <Navigate
                            to={user?.role === "admin" ? "/admin" : "/dashboard"}
                        />
                    ) : (
                        <AuthLanding />
                    )
                }
            />

            {/* User / Employee */}
            <Route
                path="/dashboard"
                element={
                    token && (user?.role === "user" || user?.role === "employee") ? (
                        <UserDashboard />
                    ) : (
                        <Navigate to="/" />
                    )
                }
            />

            <Route path="/oauth-success" element={<OAuthSuccess />} />

            {/* Admin */}
            <Route
                path="/admin"
                element={
                    token && user?.role === "admin" ? (
                        <AdminDashboard />
                    ) : (
                        <Navigate to="/" />
                    )
                }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default AppRoutes;