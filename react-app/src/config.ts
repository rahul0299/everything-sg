// src/config/api.ts

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const API = {
    AUTH: {
        LOGIN: `${BASE_URL}/auth/login`,
        SIGNUP: `${BASE_URL}/auth/register`,
        VERIFY: `${BASE_URL}/auth/verify`,
        USER: `${BASE_URL}/profile/`,
        LOGOUT: `${BASE_URL}/auth/logout`,
    },
    BOOKINGS: {
        CREATE: `${BASE_URL}/bookings/create`,
        MINE: `${BASE_URL}/bookings/mine`,
    },
    CART: {
        GET: `${BASE_URL}/cart`,
        ADD: `${BASE_URL}/cart/add`,
        REMOVE: `${BASE_URL}/cart/remove`,
        UPDATE: `${BASE_URL}/cart/update`,
    },
    CHECKOUT: `${BASE_URL}/checkout`,
    MOVIES: `${BASE_URL}/movies`,
    EVENTS: `${BASE_URL}/events`,
    ATTRACTIONS: `${BASE_URL}/attractions`,
    DINING: `${BASE_URL}/restaurants`,
    POSTER: `${BASE_URL}/poster`,
    // etc.
};
