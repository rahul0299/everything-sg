import "./movies.css";
import Carousel from "../components/Carousel/Carousel.tsx";
import {useLocation, useNavigate} from "react-router";
import MovieCard from "../components/MovieCard/MovieCard.tsx";
import {useEffect, useState} from "react";
import {API} from "../config.ts";
import {MovieData} from "../types/store.tsx";
import MoviePagePlaceholder from "../components/MoviePagePlaceholder.tsx";
import {getImgUrl} from "../utlis.ts";


const MoviesPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(true);
    const [moviesData, setMoviesData] = useState<MovieData[]>([]);

    useEffect(() => {
        setIsLoading(true);
        fetch(API.MOVIES)
            .then(res => {
                setIsLoading(false);
                return res.json()
            })
            .then(data => setMoviesData(data));
    }, [location.pathname])

    const getFeaturedMoviesCarouselData = (moviesData: MovieData[]) => {
        const featuredMoviesData: MovieData[] = moviesData.filter(movie => movie.featured_flag);

        return featuredMoviesData.map((movie: MovieData) => {
            return <div key={`movie-${movie.id}`} style={{
                width: '100%',
                height: '300px',
                borderRadius: '20px',
                overflow: 'hidden',
            }}>
                <img
                    src={getImgUrl(movie.title, movie.poster)}
                    alt={movie.title}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center'}}
                />
            </div>
        })
    }

    return (
        <>
            {
                isLoading ? (
                    <MoviePagePlaceholder />
                ) : (
                    <>
                        <div className="section">
                            <h2>Featured</h2>
                            <Carousel items={getFeaturedMoviesCarouselData(moviesData)} />
                        </div>

                        <div className="section">
                            <h2>Now Showing</h2>
                            <div className="movie-grid">
                                {
                                    moviesData.map(m => {
                                        return (
                                            <MovieCard
                                                key={`movie-${m.id}`}
                                                onClick={() => navigate(`/movies/${m.id}`, {state: {movie: m}})}
                                                movie={m}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export {MoviesPage};