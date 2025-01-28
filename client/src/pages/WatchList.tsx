import { useState, useEffect } from 'react';
import { WatchListData } from '../utils/interfaces/watchlistData';
import { retrieveWatchlistMovies } from '../api/watchlist';
import WatchlistCard from '../../src/components/WatchListCard';

const Watchlist = () => {
  const [watchlistMovies, setWatchlistMovies] = useState<WatchListData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWatchlistMovies = async () => {
      try {
        const movies = await retrieveWatchlistMovies();
        console.log('Watchlist movies:', movies); // Add this line
        setWatchlistMovies(movies);
      } catch (err) {
        console.error('Error details:', err); // Add this line
        setError('Failed to fetch watchlist movies');
      }
    };
  
    fetchWatchlistMovies();
  }, []);

  const addToSeenItList = async (movieId: number) => {
    try {
      const response = await fetch('/api/seen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: movieId }),
      });

      if (response.ok) {
        setWatchlistMovies(watchlistMovies.filter(movie => movie.movieId !== movieId));
        console.log('Movie added to seen list!');
      } else {
        throw new Error('Error adding movie to seen list');
      }
    } catch (error) {
      console.error('Error in addToSeenItList:', error);
    }
  };

  const removeFromWatchlist = async (movieId: number) => {
    try {
      const response = await fetch(`/api/watchlist/${movieId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setWatchlistMovies(watchlistMovies.filter(movie => movie.movieId !== movieId));
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
            <WatchlistCard
              key={movie.movieId}
              movie={movie}
              removeFromWatchlist={removeFromWatchlist}
              addToSeenItList={addToSeenItList}
              extraInfo={
                <p>Priority: {movie.priority}</p>
              }
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Watchlist;
