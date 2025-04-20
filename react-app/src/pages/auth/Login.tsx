import {Link, useLocation, useNavigate} from 'react-router';
import "./login.css";
import {useAuth} from "../../store/AuthContext.tsx";
import {FormEvent, useState} from "react";
import {Alert} from "@mui/material";



const Login = () => {
    const navigate = useNavigate();
    const {loginUser} = useAuth();
    const location = useLocation();
    const from = location.state?.from || "/";
    const [state, setState] = useState("")

    console.log("Came from", from);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setState("loading");

        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        console.log(email);
        console.log(password);

        try {
            const res = await loginUser(email, password);
            console.log(res);

            if (res !== "Success") {
                setState("error");
            } else {
                setState(""); // clear loading state

                navigate(from || "/");
            }
        } catch (error) {
            console.log("Login error:", error);
            setState("error");
        }
    };

    return (
        <div className="auth-container">
            <div className="card">
                <h2>Login</h2>
                {
                    state === "error" && (
                        <Alert severity="error" style={{ marginBottom: "1rem" }}>
                            Login failed. Please try again.
                        </Alert>
                    )
                }
                <form onSubmit={handleSubmit} className="auth-form">
                    <input name="email" type="email" placeholder="Email" className="login-input" />
                    <input name="password" type="password" placeholder="Password" className="login-input"/>
                    <button type="submit" className="auth-form-button" disabled={state === "loading"}>
                        {state === "loading" ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p>
                    Don't have an account? <Link to="/signup" state={{ from }}>Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
