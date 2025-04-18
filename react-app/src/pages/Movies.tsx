import "./movies.css";
import Carousel from "../components/Carousel/Carousel.tsx";
import {useNavigate} from "react-router";
import {useStore} from "../store/StoreContext.tsx";
import MovieCard from "../components/MovieCard/MovieCard.tsx";


const getRandomColor = (): string => {
    return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
};

// group by title
// include locations

// on click move to

const createArray = (num: number): number[] => {
    const res = []
    for (let i=1;i<=num;i++){
        res.push(i)
    }
    return res;
}

const MoviesPage = () => {
    const navigate = useNavigate();
    const { data: { movies } } = useStore();

    console.log(movies);

    const carouselData = [];
    for (let i = 0; i < 7; i++) {
        carouselData.push(
            <div style={{
                backgroundColor: getRandomColor(),
                width: '100%',
                height: '300px',
                borderRadius: '20px',
            }}>
            </div>
        );
    }

    return (
        <>
            <div className="section">
                <h2>Featured</h2>
                <Carousel items={carouselData} />
            </div>
            <div className="section">
                <h2>Now Showing</h2>
                <div className="movie-grid">
                    {
                        createArray(10).map(i => {
                            return (
                                <MovieCard
                                    key={`movie-${i}`}
                                    onClick={() => navigate(`/movies/${i}`, {state: {movie: movies[i % (movies.length || 1)]}})}
                                    poster={""}
                                    name={""}
                                    rating={0}
                                    genres={[]}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export {MoviesPage};