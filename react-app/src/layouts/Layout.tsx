import {Outlet, useLocation} from "react-router";
import {MenuBar} from "../components/MenuBar/MenuBar.tsx";
import "./layout.css";

const Layout = () => {
    const location = useLocation();
    const hiddenMenuPaths =["/login", "/signup", "/verification", "/checkout"];

    return (
        <>
            {!hiddenMenuPaths.includes(location.pathname) && <MenuBar />}
            <div className="container">
                <Outlet />
            </div>
        </>

    )
}

export default Layout