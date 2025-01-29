import { Movie } from '../models/index.js';

export const seedMovies = async () => {
  await Movie.bulkCreate(
    [
      {
        title: 'Inception',
        genre: 'Sci-Fi',
        description: 'A thief who enters the dreams of others to steal secrets from their subconscious.',
        releaseDate: '2010-07-16',
        streamingStatus: 'Available',
        status: 'seen'
      },
      {
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
        releaseDate: '1994-09-23',
        streamingStatus: 'Available',
        status: 'watchlist'
      },
      {
        title: 'The Dark Knight',
        genre: 'Action',
        description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        releaseDate: '2008-07-18',
        streamingStatus: 'Available',
        status: 'seen'
      }
    ],
    { individualHooks: true }
  );
};