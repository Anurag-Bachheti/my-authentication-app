// createContext = creates a global store
// useState = stores auth data(user+token)
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setupInterceptors } from "../api/interceptors";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    );

    const [sessionExpired, setSessionExpired] = useState(false);

    const refreshToken = localStorage.getItem("refreshToken");

    // login
    const login = (userData, accessToken, refreshToken) => {
        setUser(userData);
        setToken(accessToken);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", accessToken);

        if (refreshToken) {
            localStorage.setItem("refreshToken", refreshToken);
        } else {
            localStorage.removeItem("refreshToken");
        }
    };

    const setAuthToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
    };

    const getAuth = () => ({
        user,
        token,
        refreshToken,
    });

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    // logout
    const logout = (message) => {
        if (message) alert(message);
        setUser(null);
        setToken(null);
        setSessionExpired(false);
        localStorage.clear();
        navigate("/");
    };

    // ✅ Attach interceptors ONCE
    useEffect(() => {
        setupInterceptors(setSessionExpired, setToken);
    }, []);

    // ✅ ONLY show alert — NO navigation here
    useEffect(() => {
        if (sessionExpired) {
            alert("Session expired. Please login again to continue.");
        }
    }, [sessionExpired]);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                refreshToken,
                sessionExpired,
                setSessionExpired,
                setAuthToken,
                getAuth,
                login,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
