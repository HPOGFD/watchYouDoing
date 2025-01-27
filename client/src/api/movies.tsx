import { MovieData } from "../utils/interfaces/movieData";
import * as dotenv from 'dotenv';

const searchMoviesAPI = async (movieTitle: string): Promise<MovieData> => {
  // Load environment variables from .env file
  dotenv.config();

  // Get the API key from .env
  const API_KEY = process.env.API_KEY;
  if (!API_KEY) {
    console.error('API key is missing. Please check your .env file.');
    throw new Error('API key is missing. Please check your .env file.');
  }

  // Construct the API URL
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${API_KEY}`;
  console.log('Fetching data from URL:', url); // Log the URL being called

  try {
    // Fetch data from OMDB API
    const response = await fetch(url);
    console.log('Response status:', response.status); // Log the response status

    // Check if the response is OK
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON data
    const data = await response.json();
    console.log('API response data:', data); // Log the raw API response

    // Check if the API returned an error
    if (data.Response === 'False') {
      console.error('API error:', data.Error || 'Failed to fetch movie data');
      throw new Error(data.Error || 'Failed to fetch movie data');
    }

    // Return the formatted movie data
    const formattedData: MovieData = {
      id: data.imdbID,
      title: data.Title,
      genre: data.Genre,
      description: data.Plot,
      releaseDate: data.Released,
      streamingStatus: data.BoxOffice || "N/A",
      status: 'watchlist'
    };
    console.log('Formatted movie data:', formattedData); // Log the formatted data
    return formattedData;
  } catch (error) {
    console.error('Error in searchMoviesAPI:', error); // Log any unexpected errors
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export { searchMoviesAPI };