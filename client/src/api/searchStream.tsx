import { StreamData } from "../../src/utils/interfaces/streamData";

const searchStreamingAvailabilityAPI = async (movieTitle: string): Promise<StreamData> => {
  // Get the API key from the environment
  const API_KEY = import.meta.env.VITE_WATCHMODE_API_KEY;
  if (!API_KEY) {
    console.error('API key is missing. Please check your .env file.');
    throw new Error('API key is missing. Please check your .env file.');
  }

  // Construct the WatchMode API URL to search for the movie
  const movieSearchUrl = `https://api.watchmode.com/v1/search/?apiKey=${API_KEY}&search_field=title&search_value=${encodeURIComponent(movieTitle)}`;

  try {
    // Fetch movie search data from WatchMode API
    const searchResponse = await fetch(movieSearchUrl);
    if (!searchResponse.ok) {
      console.error(`HTTP error! Status: ${searchResponse.status}`);
      throw new Error(`HTTP error! Status: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    if (!searchData.data || searchData.data.length === 0) {
      console.error(`No movie found for ${movieTitle}`);
      throw new Error('Movie not found.');
    }

    // Fetch streaming availability details for the first matched movie
    const movieId = searchData.data[0].id;
    const streamingUrl = `https://api.watchmode.com/v1/title/${movieId}/sources/?apiKey=${API_KEY}`;

    const streamingResponse = await fetch(streamingUrl);
    if (!streamingResponse.ok) {
      console.error(`HTTP error! Status: ${streamingResponse.status}`);
      throw new Error(`HTTP error! Status: ${streamingResponse.status}`);
    }

    const streamingData = await streamingResponse.json();
    interface Source {
      name: string;
    }

    const availablePlatforms = streamingData.sources.map((source: Source) => source.name);

    // Format and return the streaming data
    const formattedData: StreamData = {
      title: movieTitle,  // Use the provided title
      genre: "N/A",  // Genre is not provided from WatchMode
      description: "N/A",  // Description is not provided
      releaseDate: "N/A",  // Release date is not provided
      streamingStatus: availablePlatforms.length > 0 
                          ? `Available on: ${availablePlatforms.join(', ')}`
                          : "No streaming available",
      status: 'watchlist',
      poster: "N/A",  // Poster is not available from WatchMode
      availablePlatforms: availablePlatforms  // List of available streaming platforms
    };

    return formattedData;

  } catch (error) {
    console.error('Error fetching streaming availability:', error);
    throw error;
  }
};

export { searchStreamingAvailabilityAPI };
