import { useState } from "react";
import { registerUser } from "../api/authApi";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser(form);
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

            <button type="submit">Register</button>
        </form>
    );
};

export default Register;