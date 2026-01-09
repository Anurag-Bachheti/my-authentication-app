import { useState } from "react";
import axios from "axios";

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        const res = await axios.post(
            "http://localhost:5000/api/auth/forgot-password",
            { email }
        );
        setMessage(res.data.message);
    };

    return (
        <form onSubmit={submit}>
            <h2>Forgot Password</h2>
            <input
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button>Send Reset Link</button>
            {message && <p>{message}</p>}
        </form>
    );
};