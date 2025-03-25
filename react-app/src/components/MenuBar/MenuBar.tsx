import "./menu-bar.css";
import {Link} from "react-router";

const MenuBar = () => {
    return (
        <div className="menu-bar">
            <Link to="/movies" className="underline">Movies</Link>
            <Link to="/events" className="underline">Events</Link>
            <Link to="/attractions" className="underline">Attractions</Link>
            <Link to="/dining" className="underline">Dining</Link>
        </div>
    )
}

export {MenuBar}