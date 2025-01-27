import { MoviesWatchlistData } from "../utils/interfaces/watchlistData";

const retrieveWatchlistMovies = async (): Promise<MoviesWatchlistData[]> => {
  try {
    const response = await fetch("/api/watchlist", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch watchlist movies:', error);
    throw error;
  }
};

export { retrieveWatchlistMovies };