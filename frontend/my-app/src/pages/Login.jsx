import { useContext, useState } from "react";
import { loginUser } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [form, setForm] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await loginUser(form);
            const {user, token} = res.data;

            // store in context
            login(user, token);

            // role based redirect
            if(user.role === "admin"){
                navigate("/admin");
            }else{
                navigate("/dashboard");
            }
            
            console.log("Login Successful");
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