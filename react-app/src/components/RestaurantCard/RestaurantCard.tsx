import "./restaurantcard.css";
// import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import LocationPinIcon from "@mui/icons-material/LocationPin";
// import LocalBarIcon from "@mui/icons-material/LocalBar";
// import LocalDiningIcon from '@mui/icons-material/LocalDining';
// import FastfoodIcon from '@mui/icons-material/Fastfood';
import {Divider} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {CategoryData} from "../../types/store.tsx";

export interface RestaurantCardProps {
    restaurant: CategoryData;
    onClick?: () => void;
}


// const getRandomIcon = () => {
//     const icons = [
//         LocalCafeIcon,
//         LocalBarIcon,
//         LocalDiningIcon,
//         FastfoodIcon,
//     ]
//
//     return icons[Math.floor(Math.random() * icons.length)];
// }

const getRandomImage = () => {
    const images = [
        "https://images.unsplash.com/photo-1648366311677-dcb555d41f5f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGZvb2QlMjBzaW5nYXBvcmV8ZW58MHx8MHx8fDA%3D",
        "https://plus.unsplash.com/premium_photo-1669687063538-7b5cf035c17c?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1669348704435-65abfb3905f0?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1661432484710-90bd17326a97?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fGZvb2QlMjBzaW5nYXBvcmV8ZW58MHx8MHx8fDA%3D"
    ]

    return images[Math.floor(Math.random() * images.length)];
}

const RestaurantCard = ({ restaurant, onClick = () => {} }: RestaurantCardProps) => {
    // const Icon = getRandomIcon();
    return (
        <div className="restaurant-card" onClick={onClick}>
            <img src={restaurant.images[0] || getRandomImage()} alt="name" className="restaurant-card-image" />
            <div className="restaurant-card-content">
                <h2 className="restaurant-card-title">{restaurant.name}</h2>
                <p className="restaurant-card-category">{restaurant.tags.join(", ")}</p>
                <div className="restaurant-card-subinfo">
                    <p className="restaurant-card-rating">
                        <StarIcon fontSize="small" color="warning" />
                        {restaurant.ratings}
                    </p>
                    {/*<Divider orientation="vertical" variant="middle" flexItem />*/}
                    {/*<Icon fontSize="small" />*/}
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <p className="restaurant-card-price">{`S$${restaurant.price}/person`}</p>
                </div>
                <div className="restaurant-card-location">
                    <LocationPinIcon fontSize="small" />
                    {restaurant.location}
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;
