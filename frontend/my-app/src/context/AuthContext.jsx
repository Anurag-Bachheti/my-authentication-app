import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setupInterceptors } from "../api/interceptors";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    );

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
        localStorage.clear();
        navigate("/");
    };

    // ✅ Attach interceptors ONCE
    useEffect(() => {
        setupInterceptors(getAuth, logout, setToken, setAuthToken);
    }, []);
    
    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                refreshToken,
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

export const useAuth = () => {
  return useContext(AuthContext);
};