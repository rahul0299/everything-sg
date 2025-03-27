import {Link, useNavigate} from "react-router";
import "./login.css"

const SignUp = () => {
    const navigate = useNavigate();

    const handleSubmit = (formData) => {
        console.log(formData);
        navigate("/verification");
    }

    return (
        <div className="auth-container">
            <div className="card">
                <h2>Sign Up</h2>
                <form
                    action={handleSubmit}
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
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
