import { MovieData } from "../utils/interfaces/movieData";

const retrieveSeenMovies = async (): Promise<MovieData[]> => {
  const response = await fetch("/api/seen");
  const data = await response.json();
  if (!response.ok) throw new Error("Error fetching seen movies!");
  return data;
};

export { retrieveSeenMovies };