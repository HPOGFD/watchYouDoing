// pages/seen.tsx
import { useEffect, useState } from 'react';
import { retrieveSeenMovies } from '../../src/api/seen';
import FilmCard from '../components/movieCard'; // Changed this line
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
        setError(err instanceof Error ? err.message : 'Failed to fetch movies');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {seenMovies.map((movie) => (
        <FilmCard 
          key={movie.movieId}  // Changed from movie.id to movie.movieId
          movie={movie}
          onSeenItList={() => true}
          onWatchList={() => false}
          addToWatchlist={() => {}}
          addToSeenItList={() => {}}
          removeFromStorage={() => {
            // Implement remove functionality here
            console.log(`Remove movie ${movie.movieId}`);
          }}
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