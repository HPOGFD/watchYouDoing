import { SeenData } from "../utils/interfaces/seenData";

const retrieveSeenMovies = async (): Promise<SeenData[]> => {
  try {
    const response = await fetch("/api/seen", {
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
    const validatedData = data.map((movie: Partial<SeenData>) => {
      // Check required fields from MovieData and SeenData interfaces
      if (!movie.movieId || !movie.title || !movie.genre || 
          !movie.description || !movie.releaseDate || !movie.streamingStatus) {
        throw new Error('Invalid movie data: missing required fields');
      }
      
      // Optional fields don't need validation
      // (viewedDate, rating, comment are optional in SeenData)
      
      return movie as SeenData;
    });

    return validatedData;
  } catch (error) {
    console.error('Failed to fetch seen movies:', error);
    throw error;
  }
};

export { retrieveSeenMovies };