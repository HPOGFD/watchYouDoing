import { useState, useEffect } from 'react';
import { retrieveSeenMovies } from '../api/seen';
import { MovieData } from '../utils/interfaces/movieData';
import FilmCard from '../components/movieCard';

const SeeIt = () => {
  const [seenMovies, setSeenMovies] = useState<MovieData[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch the movies once the component is mounted
  useEffect(() => {
    const fetchSeenMovies = async () => {
      try {
        const movies = await retrieveSeenMovies(); // Retrieve the movies
        setSeenMovies(movies);
      } catch (err) {
        setError('Failed to fetch seen movies'); // Handle any errors
      }
    };
    fetchSeenMovies();
  }, []);

  // Async function to add movie to the watchlist
  const addToWatchlist = async (movie: MovieData) => {
    try {
      // Your actual logic to add the movie to the watchlist, e.g. making an API request
      const response = await fetch('/api/watchlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movie),
      });

      if (!response.ok) {
        throw new Error('Error adding to watchlist');
      }
      console.log(`Movie "${movie.Title}" added to watchlist!`);
    } catch (err) {
      setError('Failed to add movie to watchlist');
      console.error('Add to Watchlist Error:', err);
    }
  };

  // Async function to remove movie from storage
  const removeFromStorage = async (movie: MovieData) => {
    try {
      // Your actual logic to remove the movie from storage, e.g. making an API request
      const response = await fetch('/api/seen', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: movie.id }), // Assuming movies have an `id` property
      });

      if (!response.ok) {
        throw new Error('Error removing from storage');
      }
      console.log(`Movie "${movie.Title}" removed from storage!`);
    } catch (err) {
      setError('Failed to remove movie from storage');
      console.error('Remove from Storage Error:', err);
    }
  };

  return (
    <>
      {/* Display an error message if there was an issue */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      {/* Map through the seenMovies and display each one using FilmCard */}
      {seenMovies.map((movie) => (
        <FilmCard
          key={movie.Title}
          currentFilm={movie}
          onSeenItList={true} // Assuming this is a flag to show that the movie is on the seen list
          addToWatchlist={() => addToWatchlist(movie)} // Pass the movie data to add to watchlist
          removeFromStorage={() => removeFromStorage(movie)} // Pass the movie data to remove from storage
          addToSeenItList={function (): Promise<void> {
            throw new Error('Function not implemented.');
          } }        />
      ))}
    </>
  );
};

export default SeeIt;
