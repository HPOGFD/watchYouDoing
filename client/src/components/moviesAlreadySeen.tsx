import type React from 'react';
import type { MovieData } from '../utils/interfaces/movieData';
import FilmCard from './movieCard';

interface SeenFilmProps {
  alreadyWatchedFilms: MovieData[];  // Assuming 'MovieData' corresponds to the type of each film in this array
  removeFromStorage:
    | ((
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        currentlyOnWatchList: boolean | null | undefined,
        currentlyOnSeenItList: boolean | null | undefined,
        title: string | null
      ) => void)
    | null;
}

const FilmsAlreadySeen = ({ alreadyWatchedFilms, removeFromStorage }: SeenFilmProps) => {
  return (
    <ul>
      {alreadyWatchedFilms.map((film) => (
        <FilmCard
          currentFilm={film}
          key={film.Title}
          onSeenItList={true} // Assuming you set it to true when rendering seen films
          removeFromStorage={removeFromStorage!} addToWatchlist={function (): Promise<void> {
            throw new Error('Function not implemented.');
          } } addToSeenItList={function (): Promise<void> {
            throw new Error('Function not implemented.');
          } }        />
      ))}
    </ul>
  );
};

export default FilmsAlreadySeen;
