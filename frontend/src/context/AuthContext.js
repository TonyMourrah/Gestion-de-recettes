import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({
    user: null,
    token: null, 
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null); 

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token"); 
        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token); 
        }
    }, []);

    const login = (user, token) => { 
        if (!user || !token) {
            console.log('Invalid user or token');
            return;
        }
        console.log('Logging in with user: ', user);
        setUser(user);
        setToken(token); 
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token); 
    };

    const logout = () => {
        setUser(null);
        setToken(null); 
        localStorage.removeItem("user");
        localStorage.removeItem("token"); 
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};