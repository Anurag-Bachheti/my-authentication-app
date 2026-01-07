import { useContext, useEffect, useState } from "react";
import { loginUser } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate,  } from "react-router-dom";

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
            const { user, accessToken } = res.data;

            // only update state here
            login(user, accessToken);
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
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;