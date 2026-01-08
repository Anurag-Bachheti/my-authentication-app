import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const AdminDashboard = () => {
    const { token, logout } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {

        if (!token) return;

        api.get("/admin/users")
            .then(res => setUsers(res.data))
            .catch((err) => console.error(err));
    }, [token]);

    const deleteUser = async (id) => {
        try {
            await api.delete(`/admin/users/${id}`);

            setUsers(prev =>
                prev.filter((u) => u._id !== id)
            );
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <button onClick={logout}>Logout</button>

            <ul>
                {users.map((u) => (
                    <li key={u._id}>
                        {u.name} ({u.role})
                        <button onClick={() => deleteUser(u._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;