import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminRoutes from './AdminRoutes'
import Login from '../pages/Login'
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import AuthLanding from '../pages/AuthLanding'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthLanding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* USER / EMPLOYEE */}
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            {/* ADMIN */}
            <Route
                path="/admin"
                element={
                    <AdminRoutes>
                        <AdminDashboard />
                    </AdminRoutes>
                }
            />

        </Routes>
    )
}

export default AppRoutes;