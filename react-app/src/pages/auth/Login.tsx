import {Link, useLocation, useNavigate} from 'react-router';
import "./login.css";
import {useAuth} from "../../store/AuthContext.tsx";
import {useState} from "react";
import {verifyUser} from "../../dummy/server.ts";



const Login = () => {
    const navigate = useNavigate();
    const {loginUser} = useAuth();
    const location = useLocation();
    const from = location.state?.from || "/";
    const [state, setState] = useState("")

    console.log("Came from", from);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setState("loading");

        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        console.log(email);
        console.log(password);

        try {
            const user = await(verifyUser({email, password}))
            loginUser(user)
            navigate(from || "/");
        } catch (error) {
            console.log(error)
        } finally {
            setState("");
        }
    }

    return (
        <div className="auth-container">
            <div className="card">
                <h2>Login</h2>
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
