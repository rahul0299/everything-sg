export interface User {
    firstname: string;
    lastname: string;
}

export interface AppState {
    isLoggedIn: boolean;
    user: User | null;
}

export type Action =
    | { type: 'LOGIN'; payload: User }
    | { type: 'LOGOUT' };

export interface CategoryData {
    description: string,
    featured_flag: number,
    id: number,
    images: string[],
    location: string,
    max_per_booking: number,
    name: string,
    operating_hours: string,
    per_slot_seats: number,
    price: number,
    ratings: number,
    tags: string[],
    time_slots: string[]
}

export interface MovieShowTime {
    date: string,
    time: string,
    venue: string,
}

export interface MovieData {
    available_languages: string[]
    available_seats: number,
    description: string,
    duration: string,
    featured_flag: number,
    genres: string[],
    id: number,
    poster: string,
    price: number,
    ratings: number,
    show_timings: MovieShowTime[]
    title: string
}