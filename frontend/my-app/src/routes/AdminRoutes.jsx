import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminRoutes = ({children}) => {
    const {auth} = useContext(AuthContext);

    if(!auth?.token) return <Navigate to="/login" />;
    if(auth.user.role !== "admin") return <Navigate to="/profile" />

    return children;
}

export default AdminRoutes;