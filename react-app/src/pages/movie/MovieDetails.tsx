import {useNavigate, useParams} from "react-router";
import "./moviedetails.css";

const posterUrl = "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/t_16by9Centre/f_auto/q_auto/fom-website/2025/F1%20movie/f1_movie_poster16x9%20(1)"


// DESIGNS
// https://foolishdeveloper.com/wp-content/uploads/2024/03/image-95.png
// https://cdn.dribbble.com/userupload/41955389/file/original-71cc4ee069667ed72c05fa803f725424.jpg


const MovieDetails = () => {
    const navigate = useNavigate();
    const movieId = useParams().id;

    console.log(movieId);
    return <>
        <div className="movie-banner">
            <div className="movie-banner-background">
                <img className="" src={posterUrl} alt=""/>
            </div>

            <div className="movie-poster">

            </div>

            <div className="movie-info">
                <h2 className="movie-title">Movie Title</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book. It has survived not only five centuries, but also
                    the leap into electronic typesetting, remaining essentially unchanged.</p>

                <div className="spacer" style={{ flexGrow: "1" }}></div>

                <button style={{ cursor: "pointer" }}>
                    See Showtimes
                </button>
            </div>
        </div>
    </>
}

export default MovieDetails;