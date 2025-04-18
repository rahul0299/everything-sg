import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { fetchData } from "../dummy/server.ts";

// Define the shape of your data
type CategoryData = {
    id: string;
    title: string;
    description: string;
    // Add other properties as per your server.ts response
};

type StoreData = {
    movies: CategoryData[];
    events: CategoryData[];
    attractions: CategoryData[];
    dining: CategoryData[];
};

type StoreContextType = {
    data: StoreData;
    refreshData: () => void;
    lastFetched: number | null;
};

// Provide a default (empty) context, but typed
const StoreContext = createContext<StoreContextType>({
    data: {
        movies: [],
        events: [],
        attractions: [],
        dining: [],
    },
    refreshData: () => {},
    lastFetched: null,
});

type StoreProviderProps = {
    children: ReactNode;
};

const StoreProvider = ({ children }: StoreProviderProps) => {
    const [data, setData] = useState<StoreData>({
        movies: [],
        events: [],
        attractions: [],
        dining: [],
    });

    const [lastFetched, setLastFetched] = useState<number | null>(null);

    const refreshData = async () => {
        const { movies, events, attractions, dining } = await fetchData() as StoreData;
        setData({ movies, events, attractions, dining });
        setLastFetched(Date.now());
    };

    useEffect(() => {
        refreshData().then(() => console.log("Data Refreshed"));

        const interval = setInterval(() => {
            refreshData().then(() => console.log("Data Refreshed"));;
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <StoreContext.Provider value={{ data, refreshData, lastFetched }}>
            {children}
        </StoreContext.Provider>
    );
};

const useStore = () => useContext(StoreContext);

export { StoreProvider, useStore };
