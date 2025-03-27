import {Outlet, useLocation} from "react-router";
import {MenuBar} from "../components/MenuBar/MenuBar.tsx";
import {useEffect} from "react";
import "./layout.css";

const Layout = () => {
    const location = useLocation();
    const hiddenMenuPaths =["/login", "/signup"];

    useEffect(() => {
        console.log("Current location:", location.pathname);
    }, [location]);

    console.log("location", location);

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