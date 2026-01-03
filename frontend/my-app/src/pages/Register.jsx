import { useState } from "react";
import { registerUser } from "../api/authApi";

const Register = () => {
    const [form, setForm] = useState({name: "", email: "", password: ""});

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser(form);
        alert("Registed Successfully");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input id="name" placeholder="name" onChange={e => setForm({...form, name: e.target.value})} />
            <br/>
            <br/>
            <input id="email" placeholder="email" onChange={e => setForm({...form, email: e.target.value})} />
            <br/>
            <br/>
            <input id="password" type="password" placeholder="password" onChange={e => setForm({...form, name: password.target.value})} />
            <br/>
            <br/>
            <button>Register</button>
        </form>
    );
};

export default Register;