import React from 'react';
import { SeenData } from '../utils/interfaces/seenData';
import { MovieData } from '../utils/interfaces/movieData';

interface FilmCardProps {
  movie: MovieData | SeenData; // Accept either MovieData or SeenData
  onSeenItList: () => boolean;
  onWatchList: () => boolean;
  addToWatchlist: () => void;
  extraInfo: JSX.Element;
}

const FilmCard: React.FC<FilmCardProps> = ({
  movie,
  onSeenItList,
  onWatchList,
  addToWatchlist,
  extraInfo,
}) => {
  // Type guard to check if movie is SeenData
  const isSeenData = (movie: MovieData | SeenData): movie is SeenData => {
    return 'movieId' in movie;
  };

  return (
    <div className="movie-card">
    {movie.poster && (
      <img 
        src={movie.poster} 
        alt={`${movie.title} Poster`} 
        className="movie-poster"
      />
    )}
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
        
      </>
    )}
    {(onSeenItList() || onWatchList()) && (
      <div>
      
        <button onClick={addToWatchlist}>
          Add to {onSeenItList() ? 'Seen It List' : 'Watchlist'}
        </button>
      </div>
    )}
  </div>
  
  );
};

export default FilmCard;