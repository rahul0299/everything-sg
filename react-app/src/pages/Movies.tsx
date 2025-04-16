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
        carouselData.push({item: i, bgcolor: getRandomColor()});
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
                                // <div style={{
                                //     backgroundColor: getRandomColor(),
                                //     height: "400px",
                                //     width: "300px",
                                //     float: "left",
                                //     borderRadius: "5px"
                                // }}
                                //      key={i}
                                // onClick={() => navigate(`/movies/${i}` , { state: { movie: movies[i % (movies.length || 1)] } })}>
                                //
                                // </div>

                                <MovieCard key={`movie-${i}`} onClick={() => navigate(`/movies/${i}` , { state: { movie: movies[i % (movies.length || 1)] } })} />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export {MoviesPage};