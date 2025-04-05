import {useLocation, useNavigate, useParams} from "react-router";
import "./moviedetails.css";
import {useRef} from "react";
import StarIcon from '@mui/icons-material/Star';

const posterUrl = "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/t_16by9Centre/f_auto/q_auto/fom-website/2025/F1%20movie/f1_movie_poster16x9%20(1)"


// DESIGNS
// https://foolishdeveloper.com/wp-content/uploads/2024/03/image-95.png
// https://cdn.dribbble.com/userupload/41955389/file/original-71cc4ee069667ed72c05fa803f725424.jpg

const genres = ["Action", "Adventure", "Thriller"]



const MovieDetails = () => {
    const navigate = useNavigate();
    const movieId = useParams().id;
    const showTimesRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    const scrollToRef = () => {
        if (showTimesRef.current) {
            showTimesRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }

    console.log(location.state.movie)

    const groupTimingsByVenue = (shows) => {
        console.log(shows)
    }

    console.log(movieId);
    return <>
        <div className="movie-banner">
            <div className="movie-banner-background">
                <img className="" src={posterUrl} alt=""/>
            </div>

            <div className="movie-poster">

            </div>

            <div className="movie-info">
                <h1 className="movie-title">Movie Title</h1>
                <p style={{ fontSize: "0.9rem", marginBottom: "40px" }}>{genres.join("\t•\t")}</p>

                <div className="" style={{ padding: "20px", fontSize: "0.9rem", borderRadius: "10px", border: "3px solid #edf6f9", backgroundColor: "rgba(255, 255, 255, 0.25)" }}>

                    <p>
                    <span style={{ width: "105px", textAlign: "left", marginRight: "20px", color: "white", fontWeight: "bold" }}>
                        User Ratings:
                    </span>
                        5.0
                        <StarIcon fontSize="small" sx={{ verticalAlign: "middle", lineHeight: "100%" }}/>
                    </p>
                    <p>
                    <span style={{ width: "105px", textAlign: "left", marginRight: "20px", color: "white", fontWeight: "bold" }}>
                        Runtime:
                    </span>
                        3h 2m
                    </p>
                    <p>
                    <span style={{ width: "105px", textAlign: "left", marginRight: "20px", color: "white", fontWeight: "bold" }}>
                        Languages:
                    </span>
                        English
                    </p>

                </div>

                <div className="spacer" style={{ flexGrow: "1" }}></div>

                <button style={{ cursor: "pointer" }} onClick={scrollToRef}>
                    See Showtimes
                </button>
            </div>

            <div className="showtimes">
                <div className="day-select"></div>
                <div className="movie-timings"></div>
            </div>
        </div>

        <div className="movie-about-section">
            <h2>About</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially unchanged.</p>
        </div>

        <div id="movie-showtimes" ref={showTimesRef}>
            <h2>Show Timings</h2>
            <div className="date-select" style={{ width: "100%", height: "100vh" }}>
            </div>
        </div>
    </>
}

export default MovieDetails;