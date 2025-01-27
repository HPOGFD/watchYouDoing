import { MovieData } from './movieData';

export interface SeenData extends MovieData {
  movieId: number;       // Foreign key referencing Movies table
  viewedDate?: Date;     // Optional field
  rating?: number;       // Optional field, between 0 and 10
  comment?: string;      // Optional field
}
