import type React from 'react';
import type { MovieData } from '../utils/interfaces/movieData';  // Assuming `MovieData` is the correct interface here
import FilmCard from './movieCard';

interface FilmsToWatchListProps {
  filmsToWatch: MovieData[];  // Correctly type this with MovieData
  removeFromStorage:
    | ((
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        currentlyOnWatchList: boolean | null | undefined,
        currentlyOnSeenItList: boolean | null | undefined,
        title: string | null
      ) => void)
    | null;
}

const FilmsToWatchList = ({ filmsToWatch, removeFromStorage }: FilmsToWatchListProps) => {
  return (
    <ul>
      {filmsToWatch.map((film) => (
        <FilmCard
          currentFilm={film}
          key={film.Title} // Ensure the Title is unique for the key
          onWatchList={true} // Set this to true for "watch list"
          removeFromStorage={removeFromStorage || (() => { })} onSeenItList={false} addToWatchlist={function (): Promise<void> {
            throw new Error('Function not implemented.');
          } } addToSeenItList={function (): Promise<void> {
            throw new Error('Function not implemented.');
          } }        />
      ))}
    </ul>
  );
};

export default FilmsToWatchList;
