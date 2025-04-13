import {useLocation, useNavigate, useParams} from "react-router";
import "./moviedetails.css";
import {useRef, useState} from "react";
import StarIcon from '@mui/icons-material/Star';
import {groupMovieShows} from "../../utlis.ts";
import DateSelect from "../../components/DateSelect/DateSelect.tsx";
import MovieVenueShowTimes from "../../components/MovieVenueShowTimes/MovieVenueShowTimes.tsx";
import {useStore} from "../../store/StoreContext.tsx";

const posterUrl = "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/t_16by9Centre/f_auto/q_auto/fom-website/2025/F1%20movie/f1_movie_poster16x9%20(1)"


// DESIGNS
// https://foolishdeveloper.com/wp-content/uploads/2024/03/image-95.png
// https://cdn.dribbble.com/userupload/41955389/file/original-71cc4ee069667ed72c05fa803f725424.jpg

const genres = ["Action", "Adventure", "Thriller"]



const MovieDetails = () => {
    const movieId = useParams().id;
    const { movies } = useStore().data;
    const showTimesRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const navigate = useNavigate();


    // TODO: Use this version later once Movies page is hooked up
    // const movieData = location.state.movie || useStore().data.movies.find(movie => movie.id === movieId);

    const movieData = location.state?.movie || movies[movieId % movies.length];

    const dates = groupMovieShows(movieData.show_timings);

    const [selectedDate, setSelectedDate] = useState<number>(0);


    const handleDateChange = (i: number) => {
        console.log("Change date to ", dates[i])
        setSelectedDate(i)
    }

    const scrollToRef = () => {
        if (showTimesRef.current) {
            showTimesRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }

    const onClick = ({ venue, time }: { venue: string, time: string }) => {
        navigate(`/movies/${movieId}/book`, { state: {
            show: {
                date: dates[selectedDate].date,
                venue: venue,
                time: time,
            }
        }});
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
                <p className="movie-genres">{genres.join("\t•\t")}</p>

                <div className="movie-details">

                    <p>
                        <span> User Ratings: </span> 5.0 <StarIcon fontSize="small" sx={{ verticalAlign: "middle", lineHeight: "100%" }}/>
                    </p>
                    <p>
                        <span >Runtime: </span> 3h 2m
                    </p>
                    <p>
                        <span> Languages: </span> English
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
            <DateSelect dates={dates.map(item => item.date)} handleDateChange={handleDateChange} selected={selectedDate} />
            <MovieVenueShowTimes data={dates[selectedDate].venues} onClick={onClick} />
        </div>
    </>
}

export default MovieDetails;