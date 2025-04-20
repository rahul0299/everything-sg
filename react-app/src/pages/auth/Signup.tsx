import {Link, useLocation, useNavigate} from "react-router";
import "./login.css"
import {FormEvent, useState} from "react";
import {signUpUser} from "../../utlis.ts";
import {Alert} from "@mui/material";

const SignUp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";
    const [state, setState] = useState("")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setState("loading");

        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const firstname = String(formData.get("fname"));
        const lastname = String(formData.get("lname"));
        const email = String(formData.get("email"));
        const password = String(formData.get("password"));

        console.log("handleSubmit", firstname, lastname, email, password);

        try {
            const res = await signUpUser({ firstname, lastname, email, password })

            if (res !== "Success") {
                setState("error");
            } else {
                navigate("/verification", { state: { user: { firstname, lastname, email, password }, from } });
            }
        } catch (error) {
            console.log("Signup error:", error);
            setState("error");
        }
    }

    return (
        <div className="auth-container">
            <div className="card">
                <h2>Sign Up</h2>
                {
                    state === "error" && (
                        <Alert severity="error" style={{ marginBottom: "1rem" }}>
                            Sign up failed. Please try again.
                        </Alert>
                    )
                }
                <form
                    onSubmit={handleSubmit}
                    className="auth-form">
                    <div style={{ display: "flex", gap: "1rem"}}>
                        <input name="firstname" type="text" placeholder="First Name" className="login-input" />
                        <input name="lastname" type="text" placeholder="Last Name" className="login-input" />
                    </div>
                    <input name="email" type="email" placeholder="Email" className="login-input" />
                    <input name="password" type="password" placeholder="Password" className="login-input" />
                    <button type="submit" className="auth-form-button">Create Account</button>
                </form>
                <p>
                    Already have an account? <Link to="/login" state={{ from }}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
