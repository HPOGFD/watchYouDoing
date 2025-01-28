// pages/seen.tsx
import { useEffect, useState } from 'react';
import { retrieveSeenMovies, removeSeenMovie } from '../../src/api/seen';
import FilmCard from '../components/movieCard'; // Ensure this is the correct import
import { SeenData } from '../utils/interfaces/seenData';

const SeenPage = () => {
  const [seenMovies, setSeenMovies] = useState<SeenData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await retrieveSeenMovies();
        setSeenMovies(movies);
      } catch (err) {
        console.error('Error fetching seen movies:', err); // Log the error for debugging
        setError(err instanceof Error ? err.message : 'Failed to fetch movies');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleRemoveFromStorage = async (movieId: number) => {
    try {
      await removeSeenMovie(movieId);
      setSeenMovies((prev) => prev.filter((movie) => movie.movieId !== movieId));
      console.log(`Removed movie ${movieId}`);
    } catch (err) {
      console.error(`Error removing movie ${movieId}:`, err);
    }
  };

  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {seenMovies.map((movie) => (
        <FilmCard
          key={movie.movieId}
          movie={{
            ...movie,
            title: movie.title || `Movie ${movie.movieId}`, // Fallback title if not provided
          }}
          onSeenItList={() => true}
          onWatchList={() => false}
          addToWatchlist={() => {}}
          addToSeenItList={() => {}}
          removeFromStorage={() => handleRemoveFromStorage(movie.movieId)}
          extraInfo={
            <>
              {movie.viewedDate && (
                <p>Viewed on: {new Date(movie.viewedDate).toLocaleDateString()}</p>
              )}
              {movie.rating !== undefined && <p>Rating: {movie.rating}/10</p>}
              {movie.comment && <p>Comment: {movie.comment}</p>}
            </>
          }
        />
      ))}
    </div>
  );
};

export default SeenPage;