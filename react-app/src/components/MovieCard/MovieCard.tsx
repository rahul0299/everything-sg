import "./movie-card.css"
import {MovieData} from "../../types/store.tsx";
import {getImgUrl} from "../../utlis.ts";

interface MovieCardProps {
    movie: MovieData,
    onClick: () => void,
}

const MovieCard = (props: MovieCardProps) => {
    return (
        <div className="movie-card" onClick={props.onClick}>
            <img src={getImgUrl(props.movie.title, props.movie.poster)} alt="name" className="movie-card-image" />
            <div className="movie-card-content">
                <h2 className="movie-card-title">{props.movie.title || "Movie Name"}</h2>
                <p className="movie-card-category">{props.movie.genres.join(", ") || "Category1, Category2"}</p>
            </div>
        </div>
    )
}

export default MovieCard;