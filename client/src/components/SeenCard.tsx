import React from 'react';
import { SeenData } from "../utils/interfaces/seenData";

interface MovieSeenCardProps {
  movie: SeenData;
  onSeenItList: () => boolean;
  onWatchList: () => boolean;
  addToWatchlist: () => void;
  addToSeenItList: () => void;
  removeFromStorage: () => void;
  extraInfo: JSX.Element;
}

const MovieSeenCard: React.FC<MovieSeenCardProps> = ({
  movie,
  onSeenItList,
  onWatchList,
  addToWatchlist,
  addToSeenItList,
  removeFromStorage,
  extraInfo
}) => {
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
      {'posterPath' in movie && (
        <img 
          src={`https://image.tmdb.org/t/p/w200${movie.posterPath}`} 
          alt={`${movie.title} poster`}
        />
      )}
      
      {/* Use the props */}
      {onSeenItList() && (
        <button onClick={removeFromStorage}>Remove from Seen List</button>
      )}
      {!onSeenItList() && !onWatchList() && (
        <>
          <button onClick={addToWatchlist}>Add to Watchlist</button>
          <button onClick={addToSeenItList}>Add to Seen List</button>
        </>
      )}
      {onWatchList() && (
        <button onClick={removeFromStorage}>Remove from Watchlist</button>
      )}
      
      {/* Display extra info */}
      {extraInfo}
    </div>
  );
};

export default MovieSeenCard;
