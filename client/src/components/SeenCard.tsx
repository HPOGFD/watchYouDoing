import React from 'react';
import { SeenData } from "../utils/interfaces/seenData";

interface MovieSeenCardProps {
  movie: SeenData;
}

const MovieSeenCard: React.FC<MovieSeenCardProps> = ({ movie }) => {
  return (
    <div className="movie-seen-card">
      <h3>{movie.title}</h3>
      <p>Movie ID: {movie.movieId}</p>
      {movie.viewedDate && (
        <p>Viewed on: {new Date(movie.viewedDate).toLocaleDateString()}</p>
      )}
      {movie.rating !== undefined && (
        <p>Rating: {movie.rating} / 10</p>
      )}
      {movie.comment && (
        <p>Comment: {movie.comment}</p>
      )}
      {/* Use type assertion here */}
      {'posterPath' in movie && (
        <img 
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          src={`https://image.tmdb.org/t/p/w200${(movie as any).posterPath}`} 
          alt={`${movie.title} poster`}
        />
      )}
    </div>
  );
};


export default MovieSeenCard;
