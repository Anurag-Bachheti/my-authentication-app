import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getDashboard } from "../api/authApi";

const Dashboard = () => {

    const { token } = useContext(AuthContext);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (token) {
            getDashboard(token).then(res =>
                setMessage(res.data.message)
            );
        }
    }, [token]);


    return (
        <h1>{message}</h1>
    )
}

export default Dashboard;