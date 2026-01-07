import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AdminDashboard = () => {
    const { token, logout } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    
    useEffect(()=> {

        if (!token) return;

        axios.get("http://localhost:5000/api/admin/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => setUsers(res.data))
        .catch((err) => console.error(err));
    }, [token]);

    const deleteUser = async(id) => {
        await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setUsers(users.filter((u)=> u._id !== id));
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <button onClick={logout}>Logout</button>

            <ul>
                {users.map((u)=> (
                    <li key={u._id}>
                        {u.name} ({u.role})
                        <button onClick={()=> deleteUser(u._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;