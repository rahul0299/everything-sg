import "./movievenueshowtimes.css";
import {MovieShowTime} from "../../types/store.tsx";

interface PropTypes {
    data: {
        venue: string;
        times: string[];
    }[],
    onClick: ({ venue, time }: { venue: string, time: string }) => void,
    selected?: MovieShowTime | null;
}

const MovieVenueShowTimes = ({ data, onClick, selected }: PropTypes) => {

    console.log(data);

    return <div className="movie-showtimes-data">
        <div className="movie-showtimes-data-row header">
            <div className="data-row-venue">Venue</div>
            <div className="data-row-timings">Timings</div>
        </div>

        {
            data.map(({ venue, times }: { venue: string, times: string[] }) => (
                <div className="movie-showtimes-data-row" key={venue}>
                    <div className="data-row-venue">
                        {venue}
                    </div>
                    <div className="data-row-timings">
                        {
                            times.map(time => <div
                                className={`data-row-timing-item ${selected?.venue === venue && selected?.time === time ? "selected" : ""}`}
                                key={`${venue}-${time}`}
                                onClick={() => onClick({ venue, time })}
                            >
                                {time}
                            </div>)
                        }
                    </div>
                </div>
            ))
        }
    </div>
}

export default MovieVenueShowTimes;