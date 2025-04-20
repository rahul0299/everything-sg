import "./restaurantcard.css";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import {Divider} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {CategoryData} from "../../types/store.tsx";
import {getImgUrl} from "../../utlis.ts";

export interface RestaurantCardProps {
    restaurant: CategoryData;
    onClick?: () => void;
}



const RestaurantCard = ({ restaurant, onClick = () => {} }: RestaurantCardProps) => {
    // const Icon = getRandomIcon();
    return (
        <div className="restaurant-card" onClick={onClick}>
            <img src={getImgUrl("dining", String(restaurant.id), restaurant.images[0])} alt="name" className="restaurant-card-image" />
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
