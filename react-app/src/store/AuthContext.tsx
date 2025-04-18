import {createContext, ReactNode, useContext, useEffect, useState} from 'react';

interface AuthUser {
    fname: string;
    lname: string;
    email: string;
    // add others if needed
}

interface AuthContextType {
    user: AuthUser | null;
    loginUser: (user: AuthUser) => void;
    logoutUser: () => void;
}


const initialState: AuthContextType = {
    user: null,
    loginUser: () => {},
    logoutUser: () => {},

}

const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setUser(JSON.parse(storedToken) as AuthUser);
        }
    }, [])

    const loginUser = (user: AuthUser) => {
        setUser(user);
        localStorage.setItem("token", JSON.stringify(user));
    }

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return <AuthContext.Provider value={{user, loginUser, logoutUser}} >
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);