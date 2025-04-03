import {useState} from "react";
import "./userprofilebutton.css";
import {useAuth} from "../../store/AuthContext.tsx";


const UserProfileButton = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const auth = useAuth();

    console.log(auth.token);


    return <div className="user-profile-menu-bar">
        <div className="user-profile-button-icon" onClick={() => setShowDropdown(!showDropdown)}>{auth.token?.fname[0] || ""}</div>
        <div className={`dropdown ${showDropdown ? "dropdown-visible" : ""}`} >
            <div className="dropdown-title">
                <p><b>{`${auth.token.fname} ${auth.token.lname}`}</b></p>
            </div>
            <div className="dropdown-content">
                <div className="dropdown-row">My Profile</div>
                <div className="dropdown-row">My Bookings</div>
                <div className="dropdown-row" onClick={auth.logoutUser}>Logout</div>
            </div>
        </div>
    </div>
}

export default UserProfileButton;