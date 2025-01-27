import React from 'react';
import { WatchListData } from '../utils/interfaces/watchlistData';

interface WatchlistCardProps {
  movie: WatchListData;
  removeFromWatchlist: (id: number) => void;
  addToSeenItList: (id: number) => void;
  extraInfo?: JSX.Element;
}

const WatchlistCard: React.FC<WatchlistCardProps> = ({
  movie,
  removeFromWatchlist,
  addToSeenItList,
  extraInfo,
}) => {
  return (
    <div className="watchlist-card border rounded-lg shadow p-4 bg-white">
      <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
      <p className="text-sm text-gray-700 mb-1">Genre: {movie.genre}</p>
      <p className="text-sm text-gray-700 mb-1">Description: {movie.description}</p>
      <p className="text-sm text-gray-700 mb-1">Release Date: {movie.releaseDate}</p>
      <p className="text-sm text-gray-700 mb-1">Streaming Status: {movie.streamingStatus}</p>
      <p className="text-sm text-gray-700 mb-1">Priority: {movie.priority}</p>
      {movie.dateAdded && (
        <p className="text-sm text-gray-700 mb-1">Date Added: {movie.dateAdded.toLocaleDateString()}</p>
      )}
      {movie.notes && <p className="text-sm text-gray-700 mb-1">Notes: {movie.notes}</p>}

      {extraInfo && <div className="extra-info mt-2">{extraInfo}</div>}

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => addToSeenItList(movie.movieId)}
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">
          Add to Seen It List
        </button>
        <button
          onClick={() => removeFromWatchlist(movie.movieId)}
          className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600">
          Remove from Watchlist
        </button>
      </div>
    </div>
  );
};

export default WatchlistCard;
