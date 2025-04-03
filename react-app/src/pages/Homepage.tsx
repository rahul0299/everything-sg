import {Link} from "react-router";
import ToggleButtonGroup from "../components/ButtonGroupSelect/ToggleButtonGroup.tsx";

const HomePage = () => {
    return (
        <>
            <h1>Home Page</h1>
            <Link to="/login"><button>Login</button></Link>
            <ToggleButtonGroup items={["Button1", "Button2", "Button3"]} />
        </>
    )
}

export {HomePage};