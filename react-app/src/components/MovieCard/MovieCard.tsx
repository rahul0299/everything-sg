import "./movie-card.css"

interface MovieCardProps {
    poster: string;
    name: string;
    rating: number;
    genres: string[];
    onClick: () => void;
}

const getRandomPoster = () => {
    const samplePosters = [
        "https://i.ebayimg.com/00/s/MTYwMFgxMTQ1/z/g2sAAOxy4YdTSEUb/$_57.JPG?set_id=880000500F",
        "https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/t_16by9Centre/f_auto/q_auto/fom-website/2025/F1%20movie/f1_movie_poster16x9%20(1)",
        "https://image.tmdb.org/t/p/original/yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg",
        "https://media.themoviedb.org/t/p/w440_and_h660_face/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg",
        "https://media.themoviedb.org/t/p/w440_and_h660_face/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
        "https://media.themoviedb.org/t/p/w440_and_h660_face/2H1TmgdfNtsKlU9jKdeNyYL5y8T.jpg"
    ]

    return samplePosters[Math.floor(Math.random() * samplePosters.length)];
}



const MovieCard = (props: MovieCardProps) => {
    return (
        <div className="movie-card" onClick={props.onClick}>
            <img src={props.poster || getRandomPoster()} alt="name" className="movie-card-image" />
            <div className="movie-card-content">
                <h2 className="movie-card-title">{props.name || "Movie Name"}</h2>
                <p className="movie-card-category">{props.genres.join(", ") || "Category1, Category2"}</p>
            </div>
        </div>
    )
}

export default MovieCard;