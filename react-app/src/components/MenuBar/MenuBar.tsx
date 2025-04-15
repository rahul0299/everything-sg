import "./menu-bar.css";
import {Link, useNavigate} from "react-router";
import {useAuth} from "../../store/AuthContext.tsx";
import UserProfileButton from "../UserProfileButton/UserProfileButton.tsx";
import {CartMenuBarButton} from "../Cart/Cart.tsx";


const MenuBar = () => {
    const authContext = useAuth();
    const navigate = useNavigate();

    return (
        <div className="menu-bar">
            <div className="menu-bar-home">
                <Link to="/">LOGO</Link>
            </div>
            <div className="menu-bar-categories">
                <Link to="/movies" className="underline">Movies</Link>
                <Link to="/events" className="underline">Events</Link>
                <Link to="/attractions" className="underline">Attractions</Link>
                <Link to="/dining" className="underline">Dining</Link>
            </div>

            <div className="menu-bar-user">

                {
                    authContext.token

                        ?
                        <>
                            <CartMenuBarButton />
                            <UserProfileButton />
                        </>

                        :

                        <>
                            <button
                                onClick={() => navigate("/login", { state: { from: location.pathname }})}
                                style={{ color: "#747bff" }}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => navigate("/signup", { state: { from: location.pathname }})}
                                style={{ color: "#747bff" }}
                            >
                                Sign Up
                            </button>
                        </>
                }

            </div>

        </div>
    )
}

export {MenuBar}