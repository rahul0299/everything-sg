import {createContext, useContext, useEffect, useState} from "react";
import {fetchData} from "../dummy/server.ts";

const StoreContext = createContext({
    data: {
        movies: [],
        events: [],
        attractions: [],
        dining: [],
    }
});



const StoreProvider = ({ children }) => {
    const [data, setData] = useState({
        data: {
            movies: [],
            events: [],
            attractions: [],
            dining: [],
        }
    });

    const [lastFetched, setLastFetched] = useState<number | null>(null);

    const refreshData = async () => {
        const { movies, events, attractions, dining } = await fetchData();
        setData(prevState => ( {...prevState, data: { movies, events, attractions, dining } }));
        setLastFetched(Date.now());
    };

    useEffect(() => {
         refreshData(); // Initial fetch

        const interval = setInterval(() => {
            refreshData();
        }, 5 * 60 * 1000);

        return () => clearInterval(interval); // Cleanup
    }, []);

    return <StoreContext.Provider value={{...data, refreshData, lastFetched}}>
        {children}
    </StoreContext.Provider>
}

const useStore = () => useContext(StoreContext);

export {StoreProvider, useStore};