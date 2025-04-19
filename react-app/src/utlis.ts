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

