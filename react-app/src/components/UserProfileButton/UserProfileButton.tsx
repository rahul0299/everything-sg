import {useState} from "react";
import "./userprofilebutton.css";
import {useAuth} from "../../store/AuthContext.tsx";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';


const UserProfileButton = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const auth = useAuth();


    return <div className="user-profile-menu-bar">
        <div className="user-profile-button-icon" onClick={() => setShowDropdown(!showDropdown)}>{auth.user?.firstname[0] || ""}</div>
        <div className={`dropdown ${showDropdown ? "dropdown-visible" : ""}`} >
            <div className="dropdown-title">
                <p><b>{`${auth.user?.firstname} ${auth.user?.lastname}`}</b></p>
            </div>
            <div className="dropdown-content">
                <div className="dropdown-row">
                    <AccountBoxIcon />
                    My Profile
                </div>
                <div className="dropdown-row" onClick={auth.logoutUser}>
                    <LogoutIcon />
                    Logout
                </div>
            </div>
        </div>
    </div>
}

export default UserProfileButton;