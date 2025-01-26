import { MovieData } from "../utils/interfaces/movieData";

const searchMoviesAPI = async (movieTitle: string): Promise<MovieData> => {
  const response = await fetch(`https://www.omdbapi.com/?t=${movieTitle}&apikey=YOUR_API_KEY`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.Error);

  return {
    id: data.imdbID, // Assuming the id is the imdbID from the API response
    Title: data.Title,
    genre: data.Genre,
    description: data.Plot,
    releaseDate: data.Released,
    streamingStatus: data.BoxOffice || "N/A",
    status: 'watchlist'
  };
};

export { searchMoviesAPI };