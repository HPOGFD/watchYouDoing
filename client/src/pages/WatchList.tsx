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
      // Add loading state if needed
      // setIsLoading(true);
  
      const response = await fetch(`/api/move-to-seen/${movieId}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add movie to seen list');
      }
  
      // Update local state only after successful API call
      setWatchlistMovies(prevMovies => 
        prevMovies.filter(movie => movie.movieId !== movieId)
      );
  
      // Optional: Show success message
      // setSuccessMessage('Movie successfully added to seen list!');
  
    } catch (error) {
      console.error('Error in addToSeenItList:', error);
      // Optional: Set error state to show to user
      // setError(error instanceof Error ? error.message : 'Failed to add movie to seen list');
    } finally {
      // Clear any loading state
      // setIsLoading(false);
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Watchlist</h1>
    
    {error && (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
        Error: {error}
      </div>
    )}
    
    {watchlistMovies.length === 0 ? (
      <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-100">
        <p className="text-lg text-gray-600">No movies in your watchlist!</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {watchlistMovies.map((movie) => (
          <WatchlistCard
            key={movie?.movieId}
            movie={movie}
            removeFromWatchlist={removeFromWatchlist}
            addToSeenItList={addToSeenItList}
            extraInfo={
              <p className="text-gray-600 mt-1">Priority: {movie.priority}</p>
            }
          />
        ))}
      </div>
    )}
  </section>
);
};

export default Watchlist;
