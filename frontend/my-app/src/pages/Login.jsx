import { useContext, useState } from "react";
import { loginUser } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";

const Login = () => {

    const { login } = useContext(AuthContext);
    const [form, setForm] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Sending form data:", form);

        try {
            const res = await loginUser(form);

            console.log("Login response:", res.data);

            login(res.data);
            console.log("Login Successful"); // works only if request succeeds
        } catch (error) {
            console.error(
                error.response?.data?.message || error.message || "Login Failed"
            );
        }
    };

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