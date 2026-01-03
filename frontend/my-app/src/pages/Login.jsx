import { useContext, useState } from "react";
import { loginUser } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";

const Login = () => {

    const { login } = useContext(AuthContext);
    const [form, setForm] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await loginUser(form);
            login(res.data);
            console.log("Login Successful"); // works only if request succeeds
        } catch (error) {
            console.error(
                error.response?.data?.message || "Login Failed"
            );
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                name="email"
                placeholder="Email" 
                onChange={e => setForm({ ...form, email: e.target.value })}
                value={form.email}
            />
            <input
                name="email"
                value={form.password}
                type="password"
                placeholder="Password"
                onChange={e => setForm({ ...form, password: e.target.value })} />
            <button>Login</button>
        </form>
    )
}

export default Login;