import {createContext, ReactNode, useContext, useEffect, useState} from 'react';

const initialState = {
    token: null,
    loginUser: () => {},
    logoutUser: () => {},

}

const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(JSON.parse(storedToken));
        }
    }, [])

    const loginUser = (user) => {
        setToken(user);
        localStorage.setItem("token", JSON.stringify(user));
    }

    const logoutUser = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    return <AuthContext.Provider value={{token, loginUser, logoutUser}} >
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);