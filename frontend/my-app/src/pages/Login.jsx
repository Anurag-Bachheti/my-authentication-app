import { useContext, useEffect, useState } from "react";
import { loginUser } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const { user, login } = useContext(AuthContext);
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // joi
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            const res = await loginUser(form);
            const { user, accessToken, refreshToken } = res.data;

            // only update state here
            login(user, accessToken, refreshToken);
        } catch (error) {

            const status = error.response?.status;
            const backendErrors = error.response?.data?.errors;
            const message = error.response?.data?.message;

            //joi validation
            if (status === 400 && backendErrors) {
                setErrors(backendErrors);
                return;
            }

            // invalid credentials
            if (status === 400 && message === "Invalid credentials") {
                alert("Invalid email or password");
                return;
            }

            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) return;

        if (user.role === "admin") {
            navigate("/admin");
        } else {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <input
                name="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <div className="password-field">
                <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    value={form.password}
                    onChange={e =>
                        setForm({ ...form, password: e.target.value })
                    }
                />

                <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPassword(prev => !prev)}
                >
                    {showPassword ? "🙈" : "👁️"}
                </button>
            </div>
            {errors.password && <p className="error">{errors.password}</p>}

            <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>

            <br />
            <br />
            <br />

            <button
                type="button"
                className="btn-google"
                onClick={() => {
                    window.location.href = "http://localhost:5000/api/auth/google";
                }}
            >
                Login with Google
            </button>
            <br />
            <br />
            <br />
            <button className="btn-link" onClick={() => navigate("/forgot-password")}>
                Forgot Password
            </button>

        </form>
    );
};

export default Login;