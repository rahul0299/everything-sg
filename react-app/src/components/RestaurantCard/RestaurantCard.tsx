import "./restaurantcard.css";
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import LocationPinIcon from "@mui/icons-material/LocationPin";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import {Divider} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export interface RestaurantCardProps {
    name: string;
    image: string;
    category: string; // e.g. "Restaurant", "Cafe", "Bar"
    rating: number;
    priceRange: string; // e.g. "$$", "Avg $25/person"
    location: string;
}

const imgUrl = "https://plus.unsplash.com/premium_photo-1669687063538-7b5cf035c17c?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

const getRandomIcon = () => {
    const icons = [
        LocalCafeIcon,
        LocalBarIcon,
        LocalDiningIcon,
        FastfoodIcon,
    ]

    return icons[Math.floor(Math.random() * icons.length)];
}

const RestaurantCard: React.FC<RestaurantCardProps> = (props) => {
    const Icon = getRandomIcon();
    return (
        <div className="restaurant-card">
            <img src={props.image || imgUrl} alt="name" className="restaurant-card-image" />
            <div className="restaurant-card-content">
                <h2 className="restaurant-card-title">{props.name || "Restaurant Name"}</h2>
                <p className="restaurant-card-category">{props.category || "Category1, Category2"}</p>
                <div className="restaurant-card-subinfo">
                    <p className="restaurant-card-rating">
                        <StarIcon fontSize="small" color="warning" />
                        {props.rating || "5.0"}
                    </p>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Icon fontSize="small" />
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <p className="restaurant-card-price">{props.priceRange || "S$50"}</p>
                </div>
                <div className="restaurant-card-location">
                    <LocationPinIcon fontSize="small" />
                    {props.location || "Location"}
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;
