export interface WatchListData {
  movieId: number;      // Foreign key referencing Movies table
  dateAdded?: Date;     // Optional, but defaults to the current date
  priority: 'Low' | 'Medium' | 'High'; // Enum for priority levels
  notes?: string;       // Optional field for additional notes
}
