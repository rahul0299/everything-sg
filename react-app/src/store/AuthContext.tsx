// src/store/AuthContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AuthUser {
    fname: string;
    lname: string;
    email: string;
}

interface AuthContextType {
    user: AuthUser | null;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    refreshUser: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);

    const refreshUser = async () => {
        // const verifyRes = await fetch('http://localhost:8000/auth/verify', {
        //     credentials: 'include',
        // });
        // if (verifyRes.ok) {
        //     setUser(null);
        // } else {
        //     const userRes = await fetch('http://localhost:8000/auth/user', {
        //         credentials: 'include',
        //     });
        //     if (userRes.ok) {
        //         const userData = await userRes.json();
        //         setUser(userData);
        //     } else {
        //         setUser(null);
        //     }
        // }

        setUser(null);
    };

    useEffect(() => {
        refreshUser().then();
    }, []);

    return (
        <AuthContext.Provider value={{ user, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
