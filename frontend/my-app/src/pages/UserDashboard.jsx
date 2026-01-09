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
            <h1>USER DASHBOARD</h1>
            <h1>Welcome, {user.name} 👋</h1>

            {/* <div style={{ marginTop: "20px" }}>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
            </div> */}

            {user.email && (
                <p><strong>Email:</strong>{user.email}</p>
            )}

            {user.phone && (
                <p><strong>Phone:</strong>{user.phone}</p>
            )}

            {user.address && (
                <p><strong>Address:</strong>{user.address}</p>
            )}

            {user.photo && (
                <img
                    src={user.photo}
                    alt="profile"
                    width="120"
                    style={{ borderRadius: "50%" }}
                />
            )}

            <button
                style={{ marginTop: "20px" }}
                onClick={handleLogout}
            >
                Logout
            </button>

            <button onClick={() => navigate("/profile")}>
                Complete Your Profile
            </button>
        </div>
    );
};

export default UserDashboard;
