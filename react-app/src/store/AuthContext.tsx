// src/store/AuthContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {API} from "../config.ts";

interface AuthUser {
    firstname: string;
    lastname: string;
    email: string;
}

interface AuthContextType {
    user: AuthUser | null;
    refreshUser: () => Promise<void>;
    loginUser: (email: string, password: string) => Promise<string>;
    logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    refreshUser: async () => {},
    loginUser: async () => "",
    logoutUser: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);

    const refreshUser = async () => {
        const verifyRes = await fetch(API.AUTH.USER, {
            credentials: 'include',
        });
        if (verifyRes.ok) {
            console.log("User Verified");
            const userData = await verifyRes.json();
            setUser(userData.profile);
        } else {
            setUser(null);
        }

    };

    useEffect(() => {
        refreshUser().then();
    }, []);

    const loginUser = async (email: string, password: string): Promise<string> => {
        try {
            const res = await fetch(API.AUTH.LOGIN, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                signal: AbortSignal.timeout(1000)
            });

            if (!res.ok || res.status !== 200) {
                throw new Error('Login failed');
            }

            await refreshUser();
            // const userData = await res.json();
            // setUser(userData);
            return "Success";
        } catch (err: unknown) {
            throw new Error("Failed to login: " + err + ". Please try again.");
        }
    };


    const logoutUser = async () => {
        await fetch(API.AUTH.LOGOUT, {
            method: 'POST',
            credentials: 'include',
        });

        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, refreshUser, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
