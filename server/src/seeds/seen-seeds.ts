import { SeenIt } from '../models/index.js';

export const seedSeenMovies = async () => {
  await SeenIt.bulkCreate(
    [
      {
        movieId: 1,
        viewedDate: new Date('2024-01-01'),
        rating: 9,
        comment: 'Great movie!',
      },
      {
        movieId: 2,
        viewedDate: new Date('2024-01-10'),
        rating: 9,
        comment: 'Good',
      },
      {
        movieId: 3,
        viewedDate: new Date('2024-02-15'),
        rating: 9,
        comment: 'An excellent .',
      },
    ],
    { individualHooks: true } // Applies model-specific hooks to each item
  );
};
