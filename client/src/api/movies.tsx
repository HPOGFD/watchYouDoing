import { MovieData } from "../utils/interfaces/movieData";
import * as dotenv from 'dotenv';

const searchMoviesAPI = async (movieTitle: string): Promise<MovieData> => {
  // Load environment variables from .env file
  dotenv.config();

  // Get the API key from .env
  const API_KEY = process.env.API_KEY;
  if (!API_KEY) {
    throw new Error('API key is missing. Please check your .env file.');
  }

  // Construct the API URL
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${API_KEY}`;

  // Fetch data from OMDB API
  const response = await fetch(url);

  // Check if the response is OK
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  // Parse the JSON data
  const data = await response.json();

  // Check if the API returned an error
  if (data.Response === 'False') {
    throw new Error(data.Error || 'Failed to fetch movie data');
  }

  // Return the formatted movie data
  return {
    id: data.imdbID,
    title: data.Title,
    genre: data.Genre,
    description: data.Plot,
    releaseDate: data.Released,
    streamingStatus: data.BoxOffice || "N/A",
    status: 'watchlist'
  };
};

export { searchMoviesAPI };