import {API} from "./config.ts";

export const getAuthToken = () => {
    return localStorage.getItem('token') || null;
}

type Show = {
    date: string;
    time: string;
    venue: string;
};

type GroupedShow = {
    date: string;
    venues: {
        venue: string;
        times: string[];
    }[];
};

export const to24Hour = (timeStr: string): string => {
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) throw new Error(`Invalid time format: ${timeStr}`);

    const [, hours, minutes, period] = match;
    let h = parseInt(hours, 10);
    const m = minutes.padStart(2, "0");

    if (period.toUpperCase() === "PM" && h !== 12) h += 12;
    if (period.toUpperCase() === "AM" && h === 12) h = 0;

    return `${String(h).padStart(2, "0")}:${m}`;
}

export const groupMovieShows = (shows: Show[]): GroupedShow[] => {
    const grouped: Record<string, Record<string, string[]>> = {};

    for (const { date, venue, time } of shows) {
        if (!grouped[date]) grouped[date] = {};
        if (!grouped[date][venue]) grouped[date][venue] = [];
        grouped[date][venue].push(time);
    }

    // Sort times and transform to array
    return Object.keys(grouped)
        .sort() // sort dates
        .map((date) => ({
            date,
            venues: Object.entries(grouped[date]).map(([venue, times]) => ({
                venue,
                times: times.sort((a, b) => to24Hour(a).localeCompare(to24Hour(b))),
            })),
        }));
}

export const getImgUrl = (name: string, poster: string): string => {
    console.log(name, poster)
    return "https://beautyrepublicfdl.com/wp-content/uploads/2020/06/placeholder-image.jpg";
}

type SignUpArgs = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export const signUpUser = async ({ firstname, lastname, email, password }: SignUpArgs) => {
    try {
        const res = await fetch(API.AUTH.SIGNUP, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstname, lastname, email, password }),
            signal: AbortSignal.timeout(1000)
        });

        if (!res.ok) {
            throw new Error('Sign up failed');
        }

        return "Success";
    } catch (err: unknown) {
        throw new Error("Error occurred: " + err + ". Please try again.");
    }
}

export const verifyOTP = async ({email, otp} : { email: string, otp: string }) => {
    try {
        const res = await fetch(API.AUTH.VERIFY, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, otp_code: otp }),
            signal: AbortSignal.timeout(1000)
        });

        if (!res.ok) {
            throw new Error('OTP verification failed');
        }

        return "Success";
    } catch (err: unknown) {
        throw new Error("Error occurred: " + err + ". Please try again.");
    }
}

export const getCategory =(path: string): string => {
    if (path.includes("events")) {
        return "events";
    } else if (path.includes("attractions")) {
        return "attractions";
    } else if (path.includes("dining")) {
        return "dining";
    } else if (path.includes("movies")) {
        return "movies";
    }

    return ""
}

export const getCategoryBaseUrl = (category: string): string => {
    if (category === "events") {
        return API.EVENTS;
    } else if (category === "attractions") {
        return API.ATTRACTIONS;
    } else if (category === "dining") {
        return API.DINING;
    }

    return ""
}

export const processPayment= () => {
    return fetch(API.CHECKOUT, {
        method: 'POST',
        credentials: 'include',
    })
}
