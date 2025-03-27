import {Link, useNavigate} from 'react-router';
import "./login.css";



const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (formData: FormData | null) => {
        console.log(formData && formData.get("email"));
        console.log(formData && formData.get("password"));
        navigate("/");
    }

    return (
        <div className="auth-container">
            <div className="card">
                <h2>Login</h2>
                <form action={handleSubmit} className="auth-form">
                    <input name="email" type="email" placeholder="Email" className="login-input" />
                    <input name="password" type="password" placeholder="Password" className="login-input"/>
                    <button type="submit" className="auth-form-button">Login</button>
                </form>
                <p>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
