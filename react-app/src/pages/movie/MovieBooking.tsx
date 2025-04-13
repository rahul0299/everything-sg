import { useLocation, useParams, useNavigate, Link } from "react-router";
import { useStore } from "../../store/StoreContext";
import "./moviebooking.css";
import {MenuItem, Select} from "@mui/material";
import {useState} from "react";
import {addToCart} from "../../dummy/server.ts";

const options = Array.from({length: 10}, (v, i) => i + 1);

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
            quantity: numSeats,
            category: "movie",
            session: {
                date, time
            }
        })
            .then(res => {
                console.log("Success", res);
                navigate("/");
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
            <div className="card" style={{display: "flex", flexDirection: "row", padding: "0", minWidth: "800px" }} >
                <div className="card-image" style={{ width: "400px", backgroundColor: "red"}} >

                </div>
                <div className="card-content" style={{minWidth: "500px", minHeight:"500px", padding: "30px", flexDirection: "column", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <h2>Booking for {movie.title}</h2>
                    <p><strong>Date:</strong> {date}</p>
                    <p><strong>Time:</strong> {time}</p>
                    <p><strong>Venue:</strong> {venue}</p>
                    <div>
                        <strong>Seats:</strong>
                        <Select
                            size="small"
                            sx={{ width: "100px" }}
                            value={numSeats}
                            onChange={e => setNumSeats(Number(e.target.value))}>
                            {
                                options.map(n => (
                                    <MenuItem key={n} value={n}>{n}</MenuItem>
                                ))
                            }
                        </Select>
                    </div>
                    <button>Cancel</button>
                    <button className="auth-button" onClick={onSubmit}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default MovieBooking;
