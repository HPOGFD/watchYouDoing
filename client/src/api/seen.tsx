import { SeenData } from "../utils/interfaces/seenData";

const retrieveSeenMovies = async (): Promise<SeenData[]> => {
  try {
    const url = '/api/seenit'; // Relative URL (will be proxied to http://localhost:3001/api/seen)
    console.log('Fetching seen movies from:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Log the raw response text
    const rawResponse = await response.text();
    console.log('Raw API response:', rawResponse);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response as JSON
    const data = JSON.parse(rawResponse);
    console.log('Parsed API response:', data);

    // Validate the response data
    if (!Array.isArray(data)) {
      throw new Error('API response is not an array');
    }

    // Basic validation of each movie object
    const validatedData = data.map((movie: Partial<SeenData>) => {
      if (!movie.movieId || !movie.viewedDate || !movie.rating || !movie.comment) {
        throw new Error('Invalid movie data: missing required fields');
      }

      return movie as SeenData;
    });

    return validatedData;
  } catch (error) {
    console.error('Error in retrieveSeenMovies:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export { retrieveSeenMovies };