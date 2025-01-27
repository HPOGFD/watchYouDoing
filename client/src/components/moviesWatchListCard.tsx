import { WatchListData } from "../utils/interfaces/watchlistData";

const retrieveWatchlistMovies = async (): Promise<WatchListData[]> => {
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

    // Validate the response data
    if (!Array.isArray(data)) {
      throw new Error('API response is not an array');
    }

    // Basic validation of each movie object
    const validatedData = data.map((movie: Partial<WatchListData>) => {
      // Check required fields from MovieData and WatchListData interfaces
      if (!movie.movieId || !movie.title || !movie.genre || 
          !movie.description || !movie.releaseDate || !movie.streamingStatus ||
          !movie.priority) {
        throw new Error('Invalid movie data: missing required fields');
      }
      
      // Optional fields don't need validation
      // (dateAdded and notes are optional in WatchListData)
      
      return movie as WatchListData;
    });

    return validatedData;
  } catch (error) {
    console.error('Failed to fetch watchlist movies:', error);
    throw error;
  }
};

export { retrieveWatchlistMovies };
