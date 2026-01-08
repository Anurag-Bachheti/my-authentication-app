import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminRoutes = ({children}) => {
    const {token, user} = useContext(AuthContext);

    if(!token) return <Navigate to="/" />;
    if(user?.role !== "admin") return <Navigate to="/" />

    return children;
}

export default AdminRoutes;