import { MovieData } from "../utils/interfaces/movieData";

// Function to retrieve movies from the watchlist
const retrieveWatchlistMovies = async (): Promise<MovieData[]> => {
  const response = await fetch("/api/watchlist");
  const data = await response.json();

  if (!response.ok) throw new Error("Error fetching watchlist movies!");

  return data;
};

export { retrieveWatchlistMovies };
