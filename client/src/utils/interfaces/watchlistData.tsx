import { MovieData } from './movieData';

export interface WatchListData extends MovieData {
  movieId: number;
  dateAdded?: Date;
  priority: string;
  notes?: string;
}
