import React from 'react';
import { WatchListData } from '../utils/interfaces/watchlistData';
import FilmCard from './movieCard';

interface FilmsToWatchListProps {
  filmsToWatch: WatchListData[];
  removeFromWatchlist: (movieId: number) => void;
}

const FilmsToWatchList: React.FC<FilmsToWatchListProps> = ({ filmsToWatch, removeFromWatchlist }) => {
  return (
    <ul>
      {filmsToWatch.map((film) => (
        <FilmCard
          key={film.movieId}
          movie={film}
          onRemove={() => removeFromWatchlist(film.movieId)}
          extraInfo={<>
            {film.dateAdded && <p>Added on: {new Date(film.dateAdded).toLocaleDateString()}</p>}
            {film.priority && <p>Priority: {film.priority}</p>}
          </>} onSeenItList={function (): boolean {
            throw new Error('Function not implemented.');
          } } onWatchList={function (): boolean {
            throw new Error('Function not implemented.');
          } } addToWatchlist={function (): void {
            throw new Error('Function not implemented.');
          } } addToSeenItList={function (): void {
            throw new Error('Function not implemented.');
          } } removeFromStorage={function (): void {
            throw new Error('Function not implemented.');
          } }        />
      ))}
    </ul>
  );
};

export default FilmsToWatchList;
