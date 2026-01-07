import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    if (!user) {
        return <h2>Loading...</h2>;
    }

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Welcome, {user.name} 👋</h1>

            <div style={{ marginTop: "20px" }}>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
            </div>

            <button
                style={{ marginTop: "20px" }}
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
};

export default UserDashboard;
