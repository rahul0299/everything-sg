import {Link} from "react-router";
import "./login.css"

const SignUp = () => {
    return (
        <div className="auth-container">
            <div className="card">
                <h2>Sign Up</h2>
                <form>
                    <input type="text" placeholder="Name" required className="login-input" /><br /><br />
                    <input type="email" placeholder="Email" required className="login-input" /><br /><br />
                    <input type="password" placeholder="Password" required className="login-input" /><br /><br />
                    <button type="submit">Create Account</button>
                </form>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
