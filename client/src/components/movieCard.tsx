import type React from 'react';
import type { MovieData } from '../utils/interfaces/movieData';

interface FilmCardProps {
  currentFilm: MovieData;
  onSeenItList: boolean;
  onWatchList?: boolean; 
  removeFromStorage: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    currentlyOnWatchList: boolean | null | undefined,
    currentlyOnSeenItList: boolean | null | undefined,
    title: string | null
  ) => void;
  addToWatchlist: () => Promise<void>;  // Add this
  addToSeenItList: () => Promise<void>; // Add this
}

const FilmCard = ({
  currentFilm,
  onSeenItList,
  onWatchList,
  removeFromStorage,
  addToWatchlist,   // Include in destructuring
  addToSeenItList,  // Include in destructuring
}: FilmCardProps) => {
  return (
    <li>
      <h3>{currentFilm.Title}</h3>
      <p>{currentFilm.genre}</p>
      <p>{currentFilm.description}</p>
      <p>{currentFilm.releaseDate}</p>
      <p>{currentFilm.streamingStatus}</p>

      {onSeenItList && removeFromStorage && (
        <button
          onClick={(e) =>
            removeFromStorage(e, onWatchList, onSeenItList, currentFilm.Title)
          }
        >
          Remove from Seen It List
        </button>
      )}
      {onWatchList && removeFromStorage && (
        <button
          onClick={(e) =>
            removeFromStorage(e, onWatchList, onSeenItList, currentFilm.Title)
          }
        >
          Remove from Watchlist
        </button>
      )}
      {!onSeenItList && !onWatchList && (
        <button onClick={addToWatchlist}>Add to Watchlist</button>
      )}
      {!onSeenItList && !onWatchList && (
        <button onClick={addToSeenItList}>Add to Seen It List</button>
      )}
    </li>
  );
};

export default FilmCard;
