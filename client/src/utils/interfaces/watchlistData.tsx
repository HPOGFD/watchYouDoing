import { MovieData } from './movieData';

export interface WatchListData extends MovieData {
  movieId: number;
  dateAdded?: Date;
  priority: 'Low' | 'Medium' | 'High';
  notes?: string;
}
