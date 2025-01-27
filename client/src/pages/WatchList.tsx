import { useState, useEffect } from 'react';
import { MovieData } from '../utils/interfaces/movieData';
import { retrieveWatchlistMovies } from '../api/watchlist';
import FilmCard from '../components/movieCard';

const Watchlist = () => {
  const [watchlistMovies, setWatchlistMovies] = useState<MovieData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWatchlistMovies = async () => {
      try {
        const movies = await retrieveWatchlistMovies();
        setWatchlistMovies(movies);
      } catch (err) {
        setError('Failed to fetch watchlist movies');
      }
    };

    fetchWatchlistMovies();
  }, []);

  const addToSeenItList = async (movieId: string | number) => {
    try {
      const response = await fetch('/api/seen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: movieId }),
      });

      if (response.ok) {
        setWatchlistMovies(watchlistMovies.filter(movie => movie.id !== movieId));
        console.log('Movie added to seen list!');
      } else {
        throw new Error('Error adding movie to seen list');
      }
    } catch (error) {
      console.error('Error in addToSeenItList:', error);
    }
  };

  const removeFromWatchlist = async (title: string) => {
    try {
      const response = await fetch(`/api/watchlist/${title}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setWatchlistMovies(watchlistMovies.filter(movie => movie.title !== title));
        console.log('Movie removed from watchlist!');
      } else {
        throw new Error('Error removing movie from watchlist');
      }
    } catch (error) {
      console.error('Error in removeFromWatchlist:', error);
    }
  };

  return (
    <section id="watchlistSection">
      <h1>Your Watchlist</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      {watchlistMovies.length === 0 ? (
        <p>No movies in your watchlist!</p>
      ) : (
        <div className="movie-list">
          {watchlistMovies.map((movie) => (
            <FilmCard
              key={movie.id}
              movie={movie} // Changed from currentFilm to movie
              onSeenItList={() => false}
              onWatchList={() => true}
              addToWatchlist={() => {}} // No-op for watchlist items
              addToSeenItList={() => addToSeenItList(movie.id)}
              removeFromStorage={() => removeFromWatchlist(movie.title)}
              extraInfo={
                <> 
                  {/* Add any additional information you want to display */}
                  <p>Added to watchlist</p>
                </>
              }
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Watchlist;