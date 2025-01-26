export interface SeenData {
    movieId: number;       // Foreign key referencing Movies table
    viewedDate?: Date;     // Optional field
    rating?: number;       // Optional field, must be between 0 and 10
    comment?: string;      // Optional field
  }
  