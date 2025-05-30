import { useLocation, useNavigate, Link } from "react-router";
import "./bookingpage.css";
import {Alert, MenuItem, Select} from "@mui/material";
import {useState} from "react";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import { Sell } from "@mui/icons-material";
import {useCart} from "../../store/CartContext.tsx";
import {CartBookingItem} from "../../types/booking.tsx";


const options = Array.from({length: 10}, (_, i) => i + 1);


interface BookingData {
    id: string;
    image: string;
    name: string;
    category: string;
    price: number;
    session: {
        date: string;
        time: string;
        venue: string;
    }
}


const BookingPage = () => {
    const cart = useCart();
    const location = useLocation();
    const navigate = useNavigate()

    const data = location.state as BookingData;

    const [state, setState] = useState("");

    const [ quantity, setQuantity] = useState(1);

    if (!data) return <div>
        <p>Item not found</p>
        <Link to="/">Home</Link>
    </div>;


    const onSubmit = async () => {
        const cartItem: CartBookingItem = {
            id: data.id,
            name: data.name,
            venue: data.session.venue,
            quantity: quantity,
            price: data.price,
            category: data.category,
            session: {
                date: data.session.date,
                time: data.session.time
            }
        }

        const res = await cart.addToCart(cartItem);
        if (res !== "Success") {
            setState("error");
        }

        navigate("/", { state: { toast: 'Added to cart successfully!' } });

    }


    // Booking form after showtime selection
    return (
        <div className="movie-booking-container">
            <div className="card" style={{display: "flex", flexDirection: "row", padding: "0", minWidth: "800px", overflow: "hidden" }} >
                <div className="card-image" style={{ width: "500px" }} >
                    <img alt="" src={data.image} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />

                </div>
                <div
                    className="card-content"
                    style={{
                        minWidth: "500px",
                        minHeight:"500px",
                        padding: "30px",
                        flexDirection: "column",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                }}>
                    {
                        state === "error" && (
                            <Alert severity="error">
                                Failed adding item to cart. Please try again.
                            </Alert>
                        )
                    }

                    <h2>Booking for {data.name}</h2>
                    <div style={{
                        margin: "10px auto"
                    }}>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                            alignItems: "baseline"
                        }}>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "start", gap: "10px", minWidth: "300px", minHeight: "40px" }}>
                            <CalendarTodayIcon sx={{ color: "gray" }} />
                            <span style={{ fontWeight: "bold", color: "gray" }}>Date:</span>
                            {data.session.date}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "start", gap: "10px", minWidth: "300px", minHeight: "40px" }}>
                            <ScheduleIcon sx={{ color: "gray" }} />
                            <span style={{ fontWeight: "bold", color: "gray" }}>Time:</span>
                            {data.session.time}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "start", gap: "10px", minWidth: "300px", minHeight: "40px" }}>
                            <LocationPinIcon sx={{ color: "gray" }} />
                            <span style={{ fontWeight: "bold", color: "gray" }}>Venue:</span>
                            {data.session.venue}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "start", gap: "10px", minWidth: "300px", minHeight: "40px" }}>
                            <Sell sx={{ color: "gray" }} />
                            <span style={{ fontWeight: "bold", color: "gray" }}>Price:</span>
                            {data.price} SGD
                        </div>

                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        alignItems: "baseline",
                        minWidth: "300px",
                        minHeight: "40px",
                    }}>
                        <strong>Select Quantity:</strong>
                        <Select
                            size="small"
                            sx={{ width: "100px", textAlign: "left" }}
                            value={quantity}
                            onChange={e => setQuantity(Number(e.target.value))}>
                            {
                                options.map(n => (
                                    <MenuItem key={n} value={n}>{n}</MenuItem>
                                ))
                            }
                        </Select>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "start", gap: "10px", minWidth: "300px", minHeight: "40px" }}>
                        <span style={{ fontWeight: "bold", color: "black" }}>Total Price:</span>
                        {data.price * quantity} SGD
                    </div>

                    <div style={{
                        margin: "40px auto 0",
                        display: "flex",
                        gap: "10px",
                        justifyContent: "start",
                    }}>
                        <button className="outline-button" onClick={() => navigate(-1)}>Cancel</button>
                        <button className="primary-button" onClick={onSubmit}>Add to Cart</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
