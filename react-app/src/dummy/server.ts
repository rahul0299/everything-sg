interface User {
    fname: string;
    lname: string;
    email: string;
    password: string;
}

const users: User[] = [
    {
        fname: "",
        lname: "",
        email: "test@123",
        password: "test",
    }
];

// EVENTS/ATTRACTIONS/RESTAURANTS

// 1. IMAGES
// 2. LOCATION
// 3. OPERATING HOURS
// 4. DESCRIPTION
// 5. RATINGS
// 6. TIME SLOTS (For RESTAURANTS Bookings only)
// 7. TAGS (on frontend like youtube home page)
// 8. PRICE
// 9. PER SLOT SEATS AVAILABLE
// 10. MAX per booking 4
// 11. FEATURED_FLAG


// FOR MOVIES

// 1. POSTER/IMAGES
// 2. TITLE
// 3. DESCRIPTION
// 4. RATINGS
// 5. SHOW TIMINGS
// 6. AVAILABLE LANGUAGES (on frontend)
// 7. GENRES
// 8. RUNTIME/DURATION
// 9. PRICE
// 10. NUMBER AVAILABLE SEATS
// 11. FEATURED_FLAG

// Don't use seat numbers. Only need number of seats being booked (simple counter)
// Per booking max 10 seats


// BOOKING ITEM

// ID
// CATEGORY
// NUMBER OF SEATS
// DATE & TIME of SESSION (2 rows)
// TIMESTAMP of booking made

// TOTAL PRICE
// DATA (include all details)

export const createUser = ({ fname, lname, email, password }: User): Promise<void> => {
    return new Promise((resolve, reject) => {
        const exists = users.some(u => u.email === email);
        if (exists) {
            return reject(new Error(`User already exists: ${email}`));
        }
        users.push({ fname, lname, email, password });
        resolve();
    });
};

export const verifyUser = ({ email, password }: Pick<User, 'email' | 'password'>): Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(u => u.email === email && u.password === password);
            if (!user) {
                return reject(new Error("Invalid credentials"));
            }
            resolve(user);
        }, 3000);
    });
};

export const verifyOTP = (otp: string): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`OTP submitted: ${otp}`);
            resolve(true);
        }, 3000);
    });
};

export const fetchData = () => {
    return new Promise((resolve) => {
        console.log(`Fetching data`)
        resolve({
            movies: [],
            events: [],
            attractions: [],
            dining: [],
        });
    })
}
