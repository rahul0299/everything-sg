import {Link, useLocation, useNavigate} from "react-router";
import "./login.css"
import {createUser} from "../../dummy/server.ts";

const SignUp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const fname = formData.get("firstname");
        const lname = formData.get("lastname");
        const email = formData.get("email");
        const password = formData.get("password");


        console.log("handleSubmit", fname, lname, email, password);

        try {
            await createUser({ fname, lname, email, password });
            navigate("/verification", { state: { user: { fname, lname, email, password }, from } });
        } catch (err: any) {
            console.log(err);
        }


        // console.log(formData && formData.entries());
        // navigate("/verification");
    }

    return (
        <div className="auth-container">
            <div className="card">
                <h2>Sign Up</h2>
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
