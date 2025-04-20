import "./dining.css";
import {FormControl, IconButton, InputBase, InputLabel, MenuItem, Paper, Select} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ButtonGroupSelect from "../components/ButtonGroupSelect/ButtonGroupSelect.tsx";
import PageTitleBanner from "../components/PageTitleBanner/PageTitleBanner.tsx";
import RestaurantCard from "../components/RestaurantCard/RestaurantCard.tsx";
import DiningPagePlaceholder from "../components/DiningPagePlaceholder.tsx";
import {useEffect, useState} from "react";
import {CategoryData} from "../types/store.tsx";
import {API} from "../config.ts";
import {useNavigate} from "react-router";


const DiningPage = () => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [restaurants, setRestaurants] = useState<CategoryData[]>([]);
    const [sortOption, setSortOption] = useState<string>("");
    const [filterRegions, setFilterRegions] = useState<string[]>([]);
    const [searchText, setSearchText] = useState<string>("");

    const allRegions = Array.from(new Set(restaurants.map(r => r.location)))
    console.log(allRegions);

    const onChangeHandler = (items: string[]) => {
        setFilterRegions(items);
    }

    useEffect(() => {
        setIsLoading(true);
        fetch(API.DINING, { signal: AbortSignal.timeout(1000) })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    throw new Error("Failed to fetch movie");
                }
            })
            .then(data => setRestaurants(data))
            .catch((err) => {
                console.error(err);
            })
            .finally(() => setIsLoading(false));
    }, [])

    const filterBySearchText = (text: string, items: CategoryData[]) => {
        if (text === "") {
            return items;
        }
        return items.filter(r => r.name.toLowerCase().includes(text.toLowerCase()));
    }

    const filterByRegion = (regions: string[], items: CategoryData[]) => {
        if (regions.length === 0) {
            return items;
        }
        return items.filter(r => regions.includes(r.location));
    }

    const sortByProperty = (property: string, items: CategoryData[]) => {
        if (property === "price") {
            return items.sort((a, b) => a.price - b.price);
        } else if (property === "rating") {
            return items.sort((a, b) => b.ratings - a.ratings);
        } else {
            return items;
        }
    }

    const filterAndSortRestaurants = () => {
        let filteredRestaurants = filterByRegion(filterRegions, restaurants);
        filteredRestaurants = filterBySearchText(searchText, filteredRestaurants);
        filteredRestaurants = sortByProperty(sortOption, filteredRestaurants);
        return filteredRestaurants;
    }


    return (
        <>
            <PageTitleBanner title={"Restaurants"} />
            {
                isLoading ? (
                    <DiningPagePlaceholder />
                ) : (
                    <div className="dining-container">

                        <div className="filter-container">
                            <p><strong>All Regions</strong></p>
                            <ButtonGroupSelect items={allRegions} onChange={onChangeHandler} />
                        </div>
                        <div className="main-panel">
                            <div className="main-panel-header">
                                <Paper
                                    component="form"
                                    elevation={0}
                                    variant="outlined"
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "400px", border: "1px solid lightgray" }}
                                >
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search restaurants"
                                        inputProps={{ 'aria-label': 'search google maps' }}
                                        fullWidth
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                    />
                                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </Paper>


                                <FormControl>
                                    <InputLabel id="dining-page-sort-label">Sort By</InputLabel>
                                    <Select
                                        labelId="dining-page-sort-label"
                                        label="Sort By"
                                        variant="outlined"
                                        sx={{ width: "200px", textAlign: "left", height: "50px" }}
                                        value={sortOption}
                                        onChange={(e) => setSortOption(e.target.value as string)}
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        <MenuItem value="price">Price</MenuItem>
                                        <MenuItem value="rating">Rating</MenuItem>
                                    </Select>
                                </FormControl>

                            </div>

                            <div className="restaurant-grid">
                                {
                                    filterAndSortRestaurants().map(r => (
                                        <RestaurantCard key={`restaurant-${r.id}`} restaurant={r} onClick={() => navigate(`/dining/${r.id}`)} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </>

    )
}

export {DiningPage};