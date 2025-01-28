import { MovieData } from "../utils/interfaces/movieData";

const searchMoviesAPI = async (movieTitle: string): Promise<MovieData> => {
  // Get the API key from the environment
  const API_KEY = import.meta.env.VITE_API_KEY
  if (!API_KEY) {
    console.error('API key is missing. Please check your .env file.');
    throw new Error('API key is missing. Please check your .env file.');
  }

  // Construct the API URL
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${API_KEY}`;
  console.log('Fetching data from URL:', url);

  try {
    // Fetch data from OMDB API
    const response = await fetch(url);
    console.log('Response status:', response.status);

    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON data
    const data = await response.json();
    console.log('API response data:', data);

    if (data.Response === 'False') {
      console.error('API error:', data.Error || 'Failed to fetch movie data');
      throw new Error(data.Error || 'Failed to fetch movie data');
    }

  // Format and return the movie data
  const formattedData: MovieData = {
    id: data.imdbID,
    title: data.Title,
    genre: data.Genre,
    description: data.Plot,
    releaseDate: data.Released,
    streamingStatus: data.BoxOffice || "N/A",
    status: 'watchlist',
    poster: data.Poster // Add the poster URL here
  };
  console.log('Formatted movie data:', formattedData);
  return formattedData;

} catch (error) {
  console.error('Error fetching movie data:', error);
  throw error;
}
};

export { searchMoviesAPI };
