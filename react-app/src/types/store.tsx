export interface User {
    email: string;
}

export interface AppState {
    isLoggedIn: boolean;
    user: User | null;
}

export type Action =
    | { type: 'LOGIN'; payload: User }
    | { type: 'LOGOUT' };
