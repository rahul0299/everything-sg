import {Link, useNavigate} from 'react-router';
import "./login.css";



const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="card">
            <h2>Login</h2>
            <form onSubmit={() => navigate("/")}>
                <input type="email" placeholder="Email" className="login-input" /><br /><br />
                <input type="password" placeholder="Password" className="login-input"/><br /><br />
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
        </div>
    );
};

export default Login;
