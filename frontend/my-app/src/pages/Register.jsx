import { useState } from "react";
import { registerUser } from "../api/authApi";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(form);
            alert("Registration successful");

            setForm({
                name: "",
                email: "",
                password: "",
                role: ""
            })

        } catch (error) {

            const status = error.response?.status;
            const message = error.response?.data?.message;

            if (status === 409 || message?.toLowerCase().includes("exists")) {
                alert("User or Member with this email already exists");

                setForm(prev => ({
                    ...prev,
                    email: ""
                }));

            } else {
                alert("Something went wrong");
            }
        }
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
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

            <div className="password-field">
                <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                    required
                />
                <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPassword(p => !p)}
                >
                    {showPassword ? "🙈" : "👁️"}
                </button>
            </div>

            <br /><br />

            <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
                <option value="user">User</option>
                <option value="employee">Employee</option>
            </select>

            <br></br>

            <button className="btn-primary" type="submit">Register</button>
        </form>
    );
};

export default Register;