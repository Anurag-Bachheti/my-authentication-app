// createContext = creates a global store
// useState = stores auth data(user+token)
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    // initialize token state
    const [token, setToken] = useState(
        localStorage.getItem("token") || null
    );

    const login = (userData, jwt) => {
        setUser(userData);
        setToken(jwt);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", jwt);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
    };

    return(
        // makes them available globally
        <AuthContext.Provider value={{user, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};