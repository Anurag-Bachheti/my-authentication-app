// createContext = creates a global store
// useState = stores auth data(user+token)
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    // initialize token state
    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    );

    const refreshToken = localStorage.getItem("refreshToken");

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

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
        navigate("/");
    };

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    return (
        // makes them available globally
        <AuthContext.Provider value={{ user, token, refreshToken, setAuthToken, getAuth, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};