import { WatchListData } from "../utils/interfaces/watchlistData";

const retrieveWatchlistMovies = async (): Promise<WatchListData[]> => {
  try {
    const response = await fetch("/api/watchlist");
    if (!response.ok) throw new Error("Error fetching watchlist movies!");

    const data = await response.json();

    console.log('Raw data from API:', data);
    console.log('Data type check:', Array.isArray(data));

    // Optional: You could add some validation here to ensure each item in the array matches WatchListData structure

    return data as WatchListData[];
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export { retrieveWatchlistMovies };
