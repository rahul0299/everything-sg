import { AppState, Action } from '../types/store';

export const initialState: AppState = {
    isLoggedIn: false,
    user: null,
};

export const reducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
};
