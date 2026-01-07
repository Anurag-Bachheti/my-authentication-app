import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const RoleProtectedRoute = ({ role }) => {
  const { user, token } = useContext(AuthContext);

  // not logged in
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  // wrong role
  if (user.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;
