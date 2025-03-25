import {Link} from "react-router";

const HomePage = () => {
    return (
        <>
            <h1>Home Page</h1>
            <Link to="/login"><button>Login</button></Link>
        </>
    )
}

export {HomePage};