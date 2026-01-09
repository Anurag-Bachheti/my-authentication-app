import { useContext, useEffect, useState } from "react";
import { loginUser } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const { user, login } = useContext(AuthContext);
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await loginUser(form);
            const { user, accessToken, refreshToken } = res.data;

            // only update state here
            login(user, accessToken, refreshToken);
        } catch (error) {
            console.error(
                error.response?.data?.message || error.message || "Login Failed"
            );
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
        <form onSubmit={handleSubmit}>
            <input
                name="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
            />

            <input
                name="password"
                type="password"
                placeholder="Password"
                required
                value={form.password}
                onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                }
            />
            <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>

            <br/>
            <br/>
            <br/>
            
            <button
                type="button"
                onClick={() => {
                    window.location.href = "http://localhost:5000/api/auth/google";
                }}
            >
                Login with Google
            </button>
            <br/>
            <br/>
            <br/>
            <button onClick={()=> navigate("/forgot-password")}>
                Forgot Password
            </button>

        </form>
    );
};

export default Login;