export interface MovieData {
  id: string | number;  // Added the id property for uniqueness
  title: string;
  genre: string;
  description: string;
  releaseDate: string;
  streamingStatus: string;
  status: 'seen' | 'watchlist';
  poster: string;
  availablePlatforms: string[];
}
