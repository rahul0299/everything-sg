import {useNavigate, useParams} from "react-router";
import "./moviedetails.css";
import {ReactNode, useEffect, useRef, useState} from "react";
import StarIcon from '@mui/icons-material/Star';
import {getImgUrl, groupMovieShows} from "../../utlis.ts";
import DateSelect from "../../components/DateSelect/DateSelect.tsx";
import MovieVenueShowTimes from "../../components/MovieVenueShowTimes/MovieVenueShowTimes.tsx";
import {MovieData, MovieShowTime} from "../../types/store.tsx";
import {API} from "../../config.ts";
import DetailsPagePlaceholder from "../../components/DetailsPagePlaceholder.tsx";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {Box, Grid} from "@mui/material";
import {ClockIcon} from "@mui/x-date-pickers";
import LocationPinIcon from "@mui/icons-material/LocationPin";
import {Sell} from "@mui/icons-material";
import {useAuth} from "../../store/AuthContext.tsx";






const sampleMovieData = {
    "available_languages": [
        "English",
        "Tamil",
        "Mandarin"
    ],
    "available_seats": 120,
    "description": "The Avengers take a final stand against Thanos in Marvel Studios’ epic conclusion to the Infinity Saga.",
    "duration": "3h 2m",
    "featured_flag": 1,
    "genres": [
        "Action",
        "Sci-Fi",
        "Adventure"
    ],
    "id": 1,
    "poster": "avengers_endgame.jpg",
    "price": 15,
    "ratings": 4.9,
    "show_timings": [
        {
            "date": "2025-04-05",
            "time": "11:30 AM",
            "venue": "GV VivoCity, Hall 3"
        },
        {
            "date": "2025-04-06",
            "time": "2:30 PM",
            "venue": "Shaw Theatres Lido, Hall 1"
        },
        {
            "date": "2025-04-07",
            "time": "5:30 PM",
            "venue": "GV Plaza, Screen 4"
        },
        {
            "date": "2025-04-07",
            "time": "9:00 PM",
            "venue": "Cathay Cineplex, Orchard"
        }
    ],
    "title": "Avengers: Endgame"
}

const MovieDetails = () => {
    const movieId = Number(useParams().id);
    const showTimesRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState<number>(0);
    const [movie, setMovie] = useState<MovieData | null>(null);
    const [selectedShow, setSelectedShow] = useState<MovieShowTime | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(`${API.MOVIES}/${movieId}`, { signal: AbortSignal.timeout(1000) })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    throw new Error("Failed to fetch movie");
                }
            })
            .then(data => setMovie(data))
            .catch((err) => {
                console.error(err);
                setMovie(sampleMovieData);
            })
            .finally(() => setIsLoading(false));
    }, [movieId]);


    console.log(movie)

    const dates = movie ? groupMovieShows(movie.show_timings) : [];

    console.log(dates)

    //
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
        console.log("Clicked", venue, time, dates[selectedDate].date);

        setSelectedShow({ date: dates[selectedDate].date, time: time, venue: venue })
    }


    return <>
        {
            isLoading ? (
                <DetailsPagePlaceholder />
            ) : (
                <>
                    <div className="movie-banner">
                        <div className="movie-banner-background">
                            <img className="movie-banner-background" src={getImgUrl(movie?.title || "", movie?.poster || "")} alt=""/>
                        </div>

                        <div className="movie-poster">
                            <img
                                src={getImgUrl(movie?.title || "", movie?.poster || "")}
                                alt=""
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    objectPosition: "center"
                                }}
                            />
                        </div>

                        <div className="movie-info">
                            <h1 className="movie-title">{movie?.title}</h1>
                            <p className="movie-genres">{movie?.genres.join("\t•\t")}</p>

                            <div className="movie-details">
                                <p>
                                    <span> User Ratings: </span>
                                    {movie?.ratings}
                                    <StarIcon fontSize="small" sx={{ verticalAlign: "middle", lineHeight: "100%" }}/>
                                </p>
                                <p>
                                    <span >Runtime: </span>
                                    {movie?.duration}
                                </p>
                                <p>
                                    <span> Languages: </span>
                                    {movie?.available_languages.join(", ")}
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
                        <p>{movie?.description}</p>
                    </div>

                    <div id="movie-showtimes" ref={showTimesRef}>
                        <Box display="flex" flexDirection="row" alignItems="start" gap="100px">
                            <div>
                                <h2>Show Timings</h2>
                                <DateSelect dates={dates.map(item => item.date)} handleDateChange={handleDateChange} selected={selectedDate} />
                                <MovieVenueShowTimes data={dates[selectedDate].venues} onClick={onClick} selected={selectedShow} />
                            </div>

                            {
                                selectedShow && movie &&
                                <SelectedShowPreview
                                    {...selectedShow }
                                    price={movie.price}
                                    seats={movie.available_seats}
                                    onClick={() => {
                                        navigate(`/movies/${movieId}/book`, { state: {
                                                id: movie.id,
                                                image: movie.poster,
                                                name: movie.title,
                                                category: "movie",
                                                session: {
                                                    date: dates[selectedDate].date,
                                                    time: selectedShow?.time || "",
                                                    venue: selectedShow?.venue || ""
                                                }
                                        }});
                                    } }
                                />
                            }
                        </Box>
                    </div>
                </>
            )
        }


    </>
}

export default MovieDetails;


interface SelectedShowPreviewProps {
    date: string,
    time: string,
    venue: string,
    seats: number,
    price: number,
    onClick: () => void,
}


const SelectedShowPreview = ({ date, time, venue, seats, price, onClick}: SelectedShowPreviewProps) => {
    const user = useAuth().user;

    const GridCell = ({ children }: { children: ReactNode }) => {
        return <Grid size={6}>
            <Box display="flex" flexDirection="row" alignItems="center" gap="10px" height="100%">
                {children}
            </Box>
        </Grid>
    }

    return <div style={{
        width: "350px",
        border: "1px solid lightgray",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        margin: "0 auto"
    }}>
        <h2>Selected Show</h2>
        <Grid container columnSpacing={4} rowSpacing={2}>
            <GridCell>
                <CalendarTodayIcon sx={{ color: "gray" }} /> {date}
            </GridCell>
            <GridCell>
                <ClockIcon sx={{ color: "gray" }} /> {time}
            </GridCell>
            <GridCell>
                <LocationPinIcon sx={{ color: "gray" }} /> {venue}
            </GridCell>
            <GridCell>
                <Sell sx={{ color: "gray" }} /> {price.toFixed(2)} SGD
            </GridCell>
        </Grid>
        <p>
            <b>Available Seats:</b> {seats}
        </p>

        {
            !user ? (
                <button className="primary-button" onClick={onClick}>Book Now</button>
            ) : (
                <span style={{ color: "red", fontSize: "0.8rem", fontStyle: "italic", textAlign: "center" }}>You need to be logged in to make a booking.</span>
            )
        }
    </div>
}