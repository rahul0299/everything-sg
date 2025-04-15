import {Link, useLocation} from "react-router";
import ButtonGroupSelect from "../components/ButtonGroupSelect/ButtonGroupSelect.tsx";
import {useEffect} from "react";
import {toast} from "react-toastify";

const HomePage = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.state?.toast) {
            toast.success(location.state.toast);
            // Clear the toast message from history so it doesn't repeat on back/forward
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    return (
        <>
            <h1>Home Page</h1>
            <Link to="/login"><button>Login</button></Link>
            <ButtonGroupSelect items={["Button1", "Button2", "Button3"]} />
        </>
    )
}

export {HomePage};