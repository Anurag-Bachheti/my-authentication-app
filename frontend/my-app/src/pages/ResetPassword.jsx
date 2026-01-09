import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


export const ResetPassword = () => {

    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");

    const submit = async (e) => {
        e.preventDefault();

        await axios.post(
            "http://localhost:5000/api/auth/reset-password",
            { token, password }
        );

        alert("Password reset successful");
        navigate("/");
    };

    return (
        <form onSubmit={submit}>
            <h2>Reset Password</h2>
            <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button>Reset Password</button>
        </form>
    )
}