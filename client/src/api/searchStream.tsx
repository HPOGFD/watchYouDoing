import { StreamData } from "../utils/interfaces/streamData";
import { searchMoviesAPI } from "./movies";

// Function to fetch streaming sources for a movie
const fetchStreamingSources = async (imdbID: string): Promise<string[]> => {
  const API_KEY = import.meta.env.VITE_WATCHMODE_API_KEY;
  if (!API_KEY) {
    console.error('WatchMode API key is missing.');
    throw new Error('API key is missing.');
  }

  // API URL to fetch sources for the movie by IMDb ID
  const url = `https://api.watchmode.com/v1/title/${imdbID}/sources/?apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Error fetching sources. Status: ${response.status}`);
      throw new Error(`Error fetching sources. Status: ${response.status}`);
    }

    // Extract source data from the response
    const data = await response.json();
    // Extract only the names from the sources
    return data.results.map((source: { name: string }) => source.name);
  } catch (error) {
    console.error('Error fetching streaming sources:', error);
    throw error;
  }
};

// Function to fetch the movie data along with its streaming sources
const fetchMovieWithStreaming = async (movieTitle: string): Promise<StreamData> => {
  // You already have searchMoviesAPI implemented
  const movieData = await searchMoviesAPI(movieTitle);

  // Fetch streaming sources for the movie
  const sources = await fetchStreamingSources(movieData.id.toString());

  // Append sources data to the movie object
  movieData.streamingStatus = sources.length > 0 ? `Streaming on: ${sources.join(', ')}` : 'Not Available for Streaming';
  
  return movieData;
};

// Function to display streaming sources on the search page
const displayStreamingSources = (sources: string[]) => {
  const sourceList = document.getElementById('sourceList');
  if (sourceList) {
    sourceList.innerHTML = ''; // Clear previous content
    sources.forEach(name => {
      const nameElement = document.createElement('p');
      nameElement.textContent = name;
      sourceList.appendChild(nameElement);
    });
  }
};

// Example usage in your search functionality
const searchMovie = async (movieTitle: string) => {
  try {
    const movieWithSources = await fetchMovieWithStreaming(movieTitle);
    // Display movie data (implement this based on your UI)
    displayMovieData(movieWithSources);
    
    // Display streaming sources
    const sources = movieWithSources.streamingStatus.startsWith('Streaming on:') 
      ? movieWithSources.streamingStatus.replace('Streaming on: ', '').split(', ')
      : [];
    displayStreamingSources(sources);
  } catch (error) {
    console.error('Error searching for movie:', error);
    // Handle error in UI
  }
};

export { fetchMovieWithStreaming, fetchStreamingSources, searchMovie };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function displayMovieData(_movieWithSources: StreamData) {
        throw new Error("Function not implemented.");
    }

