
import "./dining.css";

const DiningPage = () => {


    return (
        <>
            <div className="dining-container">
                <div className="filter-container">Filters</div>
                <div className="main-panel">
                    <div className="main-panel-header">
                        <h2 style={{textAlign: "left", marginLeft: "30px" }}>Restaurants</h2>
                        <div className="custom-select">
                            <select>
                                <option>Sort by</option>
                                <option>Price</option>
                                <option>Rating</option>
                            </select>
                        </div>
                    </div>
                    <div className="restaurant-grid">
                        {
                            Array(10).fill("").map((_, i) => (
                                <div className="restaurant-card" key={i} ></div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>

    )
}

export {DiningPage};