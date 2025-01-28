import { useState, FormEvent } from 'react';
import { searchMoviesAPI } from '../api/movies';
import { searchStreamingAvailabilityAPI } from '../api/searchStream'; // Assuming you have this API call
import FilmCard from '../components/movieCard';
import { MovieData } from '../utils/interfaces/movieData';
import { StreamData } from '../utils/interfaces/streamData';

const MovieSearch = () => {
  const [currentFilm, setCurrentFilm] = useState<MovieData>({
    id: '',
    title: '',
    genre: '',
    description: '',
    releaseDate: '',
    streamingStatus: '',
    status: 'watchlist',
    poster: '', 
  });
  
  const [streamingData, setStreamingData] = useState<StreamData | null>(null);  // New state for streaming data

  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addToWatchlist = async () => {
    try {
      console.log('Adding to watchlist:', currentFilm);
      const response = await fetch(`http://localhost:3001/api/watchlist/${currentFilm.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentFilm), // Add the movie data to the body
      });

      if (!response.ok) {
        throw new Error('Error adding movie to watchlist');
      }
      console.log('Movie successfully added to watchlist!');
    } catch (error) {
      console.error('Error in addToWatchlist:', error);
    }
  };

  const searchForMovieByTitle = async (event: FormEvent, movieTitle: string) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    console.log('Searching for movie:', movieTitle);

    try {
      const data: MovieData = await searchMoviesAPI(movieTitle);
      console.log('Movie data retrieved:', data);
      setCurrentFilm(data);

      // Now search for streaming availability for the same movie
      const streamingInfo: StreamData = await searchStreamingAvailabilityAPI(movieTitle);
      console.log('Streaming data retrieved:', streamingInfo);
      setStreamingData(streamingInfo);

    } catch (error) {
      console.error('Error fetching movie data:', error);
      setError('Failed to fetch movie data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={(event) => searchForMovieByTitle(event, searchInput)}>
        <input
          value={searchInput}
          onChange={(e) => {
            console.log('Search input updated:', e.target.value);
            setSearchInput(e.target.value);
          }}
        />
        <button type="submit" disabled={loading}>Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      {/* Render the FilmCard with streaming availability */}
      <FilmCard
        movie={currentFilm}
        onSeenItList={() => false}
        onWatchList={() => true}
        addToWatchlist={addToWatchlist}
        extraInfo={
          streamingData && (
            <>
              <p>Streaming availability: {streamingData.streamingStatus}</p>
              {streamingData.availablePlatforms.length > 0 && (
                <p>Available on: {streamingData.availablePlatforms.join(', ')}</p>
              )}
            </>
          )
        }
      />
    </>
  );
};

export default MovieSearch;
