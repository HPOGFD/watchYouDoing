import { useState, FormEvent } from 'react';
import { searchMoviesAPI } from '../api/movies';
import FilmCard from '../components/movieCard';
import { MovieData } from '../utils/interfaces/movieData';

const MovieSearch = () => {
  const [currentFilm, setCurrentFilm] = useState<MovieData>({ id : '', Title: '', genre: '', description: '', releaseDate: '', streamingStatus: '', status: 'watchlist' });
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addToWatchlist = async () => {
    try {
      // Replace this with your actual API request
      const response = await fetch(`/api/watchlist/${currentFilm.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (!response.ok) {
        throw new Error('Error adding movie to watchlist');
      }
      console.log('Movie added to watchlist!');
    } catch (error) {
      console.error('Error in addToWatchlist:', error);
    }
  };
  

  const addToSeenItList = async () => {
    setLoading(true);
    setError(null);
    try {
      await fetch('/api/seen', { method: 'POST', body: JSON.stringify(currentFilm) });
      console.log('Movie added to seen list!');
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
      // Implement logic to remove movie from storage
      console.log('Movie removed from storage');
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
    try {
      const data: MovieData = await searchMoviesAPI(movieTitle);
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
        <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
        <button type="submit" disabled={loading}>Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <FilmCard
        currentFilm={currentFilm}
        onSeenItList={false}
        onWatchList={true}

        addToSeenItList={addToSeenItList}
        removeFromStorage={removeFromStorage}
        addToWatchlist={addToWatchlist}
      />
    </>
  );
};

export default MovieSearch;