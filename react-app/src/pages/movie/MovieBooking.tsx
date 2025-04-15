import { useLocation, useParams, useNavigate, Link } from "react-router";
import { useStore } from "../../store/StoreContext";
import "./moviebooking.css";
import {MenuItem, Select} from "@mui/material";
import {useState} from "react";
import {addToCart} from "../../dummy/server.ts";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocationPinIcon from '@mui/icons-material/LocationPin';


const options = Array.from({length: 10}, (_, i) => i + 1);

const posterUrl = "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/t_16by9Centre/f_auto/q_auto/fom-website/2025/F1%20movie/f1_movie_poster16x9%20(1)"


const MovieBooking = () => {
    const { id } = useParams(); // movieId from URL
    const location = useLocation();
    const navigate = useNavigate();
    const { movies } = useStore().data;

    const movie = movies.find(m => m.id === id);

    const [ numSeats, setNumSeats] = useState(1);

    const onSubmit = async () => {
        addToCart({
            id: id as string,
            name: movie?.title || "",
            venue: venue || "",
            quantity: numSeats,
            category: "movie",
            session: {
                date, time
            }
        })
            .then(res => {
                console.log("Success", res);
                navigate("/", { state: { toast: 'Added to cart successfully!' } });
            })
            .catch(err => {
                console.log(err);
            })
    }

    if (!movie) return <div>
        <p>Movie not found</p>
        <Link to="/movies">All Movies</Link>
    </div>;

    if (!location.state?.show) return <div>
        <p>No Show Selected</p>
        <Link to={`/movies/${id}`}>See Timings</Link>
    </div>

    const { date, time, venue } = location.state.show;

    // Booking form after showtime selection
    return (
        <div className="movie-booking-container">
            <div className="card" style={{display: "flex", flexDirection: "row", padding: "0", minWidth: "800px", overflow: "hidden" }} >
                <div className="card-image" style={{ width: "500px" }} >
                    <img src={posterUrl} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />

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
                    <h2>Booking for {movie.title}</h2>
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
                            {date}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "start", gap: "10px", minWidth: "300px", minHeight: "40px" }}>
                            <ScheduleIcon sx={{ color: "gray" }} />
                            <span style={{ fontWeight: "bold", color: "gray" }}>Time:</span>
                            {time}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "start", gap: "10px", minWidth: "300px", minHeight: "40px" }}>
                            <LocationPinIcon sx={{ color: "gray" }} />
                            <span style={{ fontWeight: "bold", color: "gray" }}>Venue:</span>
                            {venue}
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
                        <strong>Select Seats:</strong>
                        <Select
                            size="small"
                            sx={{ width: "100px", textAlign: "left" }}
                            value={numSeats}
                            onChange={e => setNumSeats(Number(e.target.value))}>
                            {
                                options.map(n => (
                                    <MenuItem key={n} value={n}>{n}</MenuItem>
                                ))
                            }
                        </Select>
                    </div>

                    <div style={{
                        margin: "40px auto 0",
                        display: "flex",
                        gap: "10px",
                        justifyContent: "start",
                    }}>
                        <button className="outline-button">Cancel</button>
                        <button className="primary-button" onClick={onSubmit}>Add to Cart</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieBooking;
