import { MovieData } from "../utils/interfaces/movieData";
import * as dotenv from 'dotenv';

const searchMoviesAPI = async (movieTitle: string): Promise<MovieData> => {
  
dotenv.config();

const API_KEY = process.env.API_KEY;
  const response = await fetch(`https://www.omdbapi.com/?t=${movieTitle}&apikey=${API_KEY}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.Error);

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
