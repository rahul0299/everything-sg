import "./movievenueshowtimes.css";

interface PropTypes {
    data: {
        venue: string;
        times: string[];
    }[],
    onClick: ({ venue, time }: { venue: string, time: string }) => void
}

const MovieVenueShowTimes = ({ data, onClick }: PropTypes) => {

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
                                className="data-row-timing-item"
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