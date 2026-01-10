import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const AdminDashboard = () => {
    const { token, logout } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    // ✅ Used for BOTH create and edit
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        role: "user",
    });

    const [editingUserId, setEditingUserId] = useState(null);

    useEffect(() => {
        if (!token) return;

        api.get("/admin/users")
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));
    }, [token]);

    // ✅ CREATE or UPDATE user
    const handleSubmit = async () => {
        try {
            if (editingUserId) {
                // ✏️ EDIT USER
                const res = await api.put(
                    `/admin/users/${editingUserId}`,
                    {
                        name: newUser.name,
                        role: newUser.role,
                    }
                );

                setUsers(prev =>
                    prev.map(u => (u._id === editingUserId ? res.data : u))
                );
            } else {
                // ➕ CREATE USER
                const res = await api.post("/admin/users", newUser);
                setUsers(prev => [...prev, res.data.user]);
            }

            // 🔄 Reset form
            setNewUser({ name: "", email: "", role: "user" });
            setEditingUserId(null);

        } catch (err) {
            alert("Operation failed");
        }
    };

    const deleteUser = async (id) => {
        try {
            await api.delete(`/admin/users/${id}`);
            setUsers(prev => prev.filter(u => u._id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <button onClick={()=> logout()}>Logout</button>

            {/* 🔥 REUSED FORM */}
            <h3>{editingUserId ? "Edit User" : "Create User"}</h3>

            <input
                placeholder="Name"
                value={newUser.name}
                onChange={e =>
                    setNewUser({ ...newUser, name: e.target.value })
                }
            />

            <input
                placeholder="Email"
                value={newUser.email}
                disabled={!!editingUserId} // 🔒 email locked during edit
                onChange={e =>
                    setNewUser({ ...newUser, email: e.target.value })
                }
            />

            <select
                value={newUser.role}
                onChange={e =>
                    setNewUser({ ...newUser, role: e.target.value })
                }
            >
                <option value="user">User</option>
                <option value="employee">Employee</option>
            </select>

            <button onClick={handleSubmit}>
                {editingUserId ? "Save" : "Create"}
            </button>

            {editingUserId && (
                <button
                    onClick={() => {
                        setEditingUserId(null);
                        setNewUser({ name: "", email: "", role: "user" });
                    }}
                >
                    Cancel
                </button>
            )}

            <hr />

            {/* 👥 USER LIST */}
            <ul>
                {users.map(u => (
                    <li key={u._id}>
                        {u.name} ({u.role})

                        <button
                            onClick={() => {
                                setEditingUserId(u._id);
                                setNewUser({
                                    name: u.name,
                                    email: u.email,
                                    role: u.role,
                                });
                            }}
                        >
                            Edit
                        </button>

                        <button onClick={() => deleteUser(u._id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
