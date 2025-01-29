import React from 'react';
import { SeenData } from '../utils/interfaces/seenData';
import { MovieData } from '../utils/interfaces/movieData';

interface FilmCardProps {
  movie: MovieData | SeenData; // Accept either MovieData or SeenData
  onSeenItList: () => boolean;
  onWatchList: () => boolean;
  addToWatchlist: () => void;
  addToSeenItList: () => void;
  removeFromStorage: () => void;
  extraInfo: JSX.Element;
}

const FilmCard: React.FC<FilmCardProps> = ({
  movie,
  onSeenItList,
  onWatchList,
  addToSeenItList,
  removeFromStorage,
  addToWatchlist,
  extraInfo,
}) => {
  // Type guard to check if movie is SeenData
  const isSeenData = (movie: MovieData | SeenData): movie is SeenData => {
    return 'movieId' in movie;
  };

  return (
    <div className="movie-card">
      <h3>{movie.title}</h3>

      {/* Only show MovieData-specific fields if it's MovieData */}
      {!isSeenData(movie) && (
        <>
          <p>Genre: {movie.genre}</p>
          <p>Description: {movie.description}</p>
          <p>Release Date: {movie.releaseDate}</p>
          <p>Streaming Status: {movie.streamingStatus}</p>
        </>
      )}

      {/* Only show SeenData-specific fields if it's SeenData */}
      {isSeenData(movie) && (
        <div>
          {movie.viewedDate && (
            <p>Viewed on: {new Date(movie.viewedDate).toLocaleDateString()}</p>
          )}
          {movie.rating !== undefined && <p>Rating: {movie.rating}/10</p>}
          {movie.comment && <p>Comment: {movie.comment}</p>}
        </div>
      )}

      {extraInfo}

      {!onSeenItList() && !onWatchList() && (
        <>
          <button onClick={addToWatchlist}>Add to Watchlist</button>
          <button onClick={addToSeenItList}>Add to Seen It List</button>
        </>
      )}
      {(onSeenItList() || onWatchList()) && (
        <button onClick={removeFromStorage}>
          Remove from {onSeenItList() ? 'Seen It List' : 'Watchlist'}
        </button>
      )}
    </div>
  );
};

export default FilmCard;