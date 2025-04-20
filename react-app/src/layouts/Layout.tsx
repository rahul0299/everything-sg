import {Outlet, useLocation} from "react-router";
import {MenuBar} from "../components/MenuBar/MenuBar.tsx";
import "./layout.css";
import Footer from "../components/Footer/Footer.tsx";

const Layout = () => {
    const location = useLocation();
    const hiddenMenuPaths =["/login", "/signup", "/verification", "/checkout"];

    return (
        <>
            {!hiddenMenuPaths.includes(location.pathname) && <MenuBar />}
            <div className="container">
                <Outlet />
            </div>
            <div className='footer'>
                <Footer />
            </div>
        </>

    )
}

export default Layout