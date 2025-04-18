import Carousel from "./Carousel/Carousel.tsx";
import {Box, Skeleton} from "@mui/material";
import {ReactNode} from "react";

const MoviePagePlaceholder = () => {
    const carouselItemPlaceholder = (
        <Box width="100%" height="300px" sx={{ borderRadius: "10px", overflow: "hidden" }}>
            <Skeleton variant="rectangular" width="100%" height="100%" />
        </Box>
    )
    const carouselItems: ReactNode[] = []

    for (let i = 0; i < 3; i++) {
        carouselItems.push(carouselItemPlaceholder)
    }

    const gridItems = Array(10).fill(0);

    console.log(gridItems);

    return (
        <>
            <div className="section">
                <Skeleton width="50%" sx={{ marginY: 2, height: 40 }}/>
                <Carousel items={carouselItems} />
            </div>
            <div className="section">
                <Skeleton width="50%" sx={{ marginY: 2, height: 40 }}/>
                <div className="movie-grid">
                    {
                        gridItems.map((_, i) => (
                            <Box width="100%" height="350px" key={`placeholder-${i}`} borderRadius={2} overflow="hidden">
                                <Skeleton variant="rectangular"  width="100%" height="100%"/>
                            </Box>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default MoviePagePlaceholder;