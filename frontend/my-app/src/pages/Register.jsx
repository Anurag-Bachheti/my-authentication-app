import { useState } from "react";
import { registerUser } from "../api/authApi";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    const handleSubmit = async(e) => {
        e.preventDefault();
        await registerUser(form);
        alert("Registed Successfully");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                }
                required
            />

            <br /><br />

            <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                }
                required
            />

            <br /><br />

            <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                }
                required
            />

            <br /><br />

            <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value})}
            >
                <option value="user">User</option>
                <option value="employee">Employee</option>
            </select>

            <br></br>

            <button type="submit">Register</button>
        </form>
    );
};

export default Register;