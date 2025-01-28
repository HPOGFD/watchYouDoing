import { useState, FormEvent } from 'react';
import { searchMoviesAPI } from '../api/movies'; // Use the new function
import FilmCard from '../components/movieCard';
import { MovieData } from '../utils/interfaces/movieData';

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
    availablePlatforms: [], // Added the missing property
  });
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addToWatchlist = async () => {
    try {
      console.log('Adding to watchlist:', currentFilm);
      const response = await fetch(`http://localhost:3001/api/watchlist/${currentFilm.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentFilm),
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
      const data: MovieData = await searchMoviesAPI(movieTitle); // Fetch movie with streaming data
      console.log('Movie data retrieved:', data);
      setCurrentFilm(data);
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
      <FilmCard
        movie={currentFilm}
        onSeenItList={() => false}
        onWatchList={() => true}
        addToWatchlist={addToWatchlist}
        extraInfo={<> {currentFilm.streamingStatus && <p style={{ color: 'red' }}>Streaming on: {currentFilm.streamingStatus}</p>} </>}
      />
    </>
  );
};

export default MovieSearch;
