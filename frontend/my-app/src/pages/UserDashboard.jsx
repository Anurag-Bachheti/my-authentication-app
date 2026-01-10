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

            {user.photo && (
                <img
                    src={`http://localhost:5000${user.photo}`}
                    alt="profile"
                    style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginBottom: "15px",
                    }}
                />
            )}

            {user.email && (
                <p><strong>Email:</strong>{user.email}</p>
            )}

            {user.phone && (
                <p><strong>Phone:</strong>{user.phone}</p>
            )}

            {user.address && (
                <p><strong>Address:</strong>{user.address}</p>
            )}

            <button onClick={() => navigate("/profile")}>
                Complete Your Profile
            </button>

            <br/>
            <br/>
            
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
