import "./dining.css";
import {FormControl, IconButton, InputBase, InputLabel, MenuItem, Paper, Select} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ButtonGroupSelect from "../components/ButtonGroupSelect/ButtonGroupSelect.tsx";
import PageTitleBanner from "../components/PageTitleBanner/PageTitleBanner.tsx";


const DiningPage = () => {


    return (
        <>
            <PageTitleBanner title={"Restaurants"} />
            <div className="dining-container">

                <div className="filter-container">
                    <p><strong>All Regions</strong></p>
                    <ButtonGroupSelect items={["Clementi", "Orchard Rd", "Buona Vista", "Clarke Quay", "Kent Ridge"]} />
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
                                sx={{ width: "200px", textAlign: "left", height: "50px" }}>
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="price">Price</MenuItem>
                                <MenuItem value="rating">Rating</MenuItem>
                            </Select>
                        </FormControl>

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