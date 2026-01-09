import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLanding from '../pages/AuthLanding'
import UserDashboard from '../pages/UserDashboard'
import AdminDashboard from '../pages/AdminDashboard';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { OAuthSuccess } from '../context/OAthSuccess';
import { ForgotPassword } from '../pages/ForgotPassword';
import { ResetPassword } from '../pages/ResetPassword';
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

            {/* OAth Google*/}
            <Route path="/oauth-success" element={<OAuthSuccess />} />
            
            {/* Reset Pass */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
    );
}

export default AppRoutes;