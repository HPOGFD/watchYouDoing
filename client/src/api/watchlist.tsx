import { WatchListData } from "../utils/interfaces/watchlistData";

const retrieveWatchlistMovies = async (): Promise<WatchListData[]> => {
  try {
    const url = '/api/watchlist';
    console.log('Fetching watchlist from:', url);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const rawResponse = await response.text();
    console.log('Raw API response:', rawResponse);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = JSON.parse(rawResponse);
    console.log('Parsed API response:', data);

    if (!Array.isArray(data)) {
      throw new Error('API response is not an array');
    }

    const validatedData = data.map((movie: Partial<WatchListData>) => {
      if (!movie.movieId || !movie.dateAdded || !movie.priority || !movie.notes) {
        throw new Error('Invalid movie data: missing required fields');
      }

      return {
        movieId: movie.movieId,
        dateAdded: movie.dateAdded,
        priority: movie.priority,
        notes: movie.notes
      } as WatchListData;
    });

    return validatedData;
  } catch (error) {
    console.error('Error in retrieveWatchlistMovies:', error);
    throw error;
  }
};

export { retrieveWatchlistMovies };
