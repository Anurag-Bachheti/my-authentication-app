import { useState } from "react";
import { registerUser } from "../api/authApi";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    // Joi validation
    const [errors, setErrors] = useState({});

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
            });

            setErrors({});

        } catch (error) {

            const status = error.response?.status;
            const message = error.response?.data?.message;
            const validationErrors = error.response?.data?.errors;

            if (status === 400 && validationErrors) {
                setErrors(validationErrors);
                return;
            }

            // dublicate email
            if (status === 409 || message?.toLowerCase().includes("exists")) {
                alert("User or Member with this email already exists");

                setForm(prev => ({
                    ...prev,
                    email: ""
                }));

                setErrors(prev => ({
                    ...prev,
                    email: "Email already exists"
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
                onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    setErrors(prev => ({ ...prev, name: "" }));
                }}
                required
            />

            {errors.name && <p className="error">{errors.name}</p>}

            <br /><br />

            <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    setErrors(prev => ({ ...prev, email: "" }));
                }}
                required
            />

            {errors.email && <p className="error">{errors.email}</p>}

            <br /><br />

            <div className="password-field">
                <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => {
                        setForm({ ...form, password: e.target.value })
                        setErrors(prev => ({ ...prev, password: "" }));
                    }}
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

            {errors.password && <p className="error">{errors.password}</p>}

            <br /><br />

            <select
                value={form.role}
                onChange={(e) => {
                    setForm({ ...form, role: e.target.value });
                    setErrors(prev => ({ ...prev, role: "" }));
                }}
            >
                <option value="user">User</option>
                <option value="employee">Employee</option>
            </select>

            {errors.role && <p className="error">{errors.role}</p>}

            <br></br>

            <button className="btn-primary" type="submit">Register</button>
        </form>
    );
};

export default Register;