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
