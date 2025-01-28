import { useState, FormEvent } from 'react';
import { searchMoviesAPI } from '../api/movies';
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
  });
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addToWatchlist = async () => {
    try {
      console.log('Adding to watchlist:', currentFilm);
      const response = await fetch(`/api/watchlist/${currentFilm.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Error adding movie to watchlist');
      }
      console.log('Movie successfully added to watchlist!');
    } catch (error) {
      console.error('Error in addToWatchlist:', error);
    }
  };

  const addToSeenItList = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Adding to seen list:', currentFilm);
      await fetch('/api/seen', { method: 'POST', body: JSON.stringify(currentFilm) });
      console.log('Movie successfully added to seen list!');
    } catch (error) {
      console.error('Error in addToSeenItList:', error);
      setError('Error adding movie to seen list');
    } finally {
      setLoading(false);
    }
  };

  const removeFromStorage = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Removing from storage:', currentFilm);
      console.log('Movie successfully removed from storage!');
    } catch (error) {
      console.error('Error in removeFromStorage:', error);
      setError('Error removing movie from storage');
    } finally {
      setLoading(false);
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
        addToSeenItList={addToSeenItList}
        removeFromStorage={removeFromStorage}
        addToWatchlist={addToWatchlist}
        extraInfo={<></>} // Add an empty JSX element or some additional info if needed
      />
    </>
  );
};

export default MovieSearch;
