import "./menu-bar.css";
import {Link} from "react-router";
import {useCart} from "../../store/CartContext.tsx";

const icon_svg_url = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNob3BwaW5nLWNhcnQtaWNvbiBsdWNpZGUtc2hvcHBpbmctY2FydCI+PGNpcmNsZSBjeD0iOCIgY3k9IjIxIiByPSIxIi8+PGNpcmNsZSBjeD0iMTkiIGN5PSIyMSIgcj0iMSIvPjxwYXRoIGQ9Ik0yLjA1IDIuMDVoMmwyLjY2IDEyLjQyYTIgMiAwIDAgMCAyIDEuNThoOS43OGEyIDIgMCAwIDAgMS45NS0xLjU3bDEuNjUtNy40M0g1LjEyIi8+PC9zdmc+"

const MenuBar = () => {
    const cartContext = useCart();

    return (
        <div className="menu-bar">
            <Link to="/movies" className="underline">Movies</Link>
            <Link to="/events" className="underline">Events</Link>
            <Link to="/attractions" className="underline">Attractions</Link>
            <Link to="/dining" className="underline">Dining</Link>


            {/*// TODO: Add an icon pack. Remove svg*/}
            <button onClick={() => cartContext.dispatch({
                type: "SHOW_CART",
                payload: "",
            })} style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.4rem",
                outline: "1px solid lightgray",
            }}>
                Cart
                <img src={icon_svg_url}  alt="cart"/>
            </button>
        </div>
    )
}

export {MenuBar}