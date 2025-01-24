import { WatchList } from '../models/watched.js';

export const seedWatchedList = async () => {
  try {
    // Seed the WatchList data
    await WatchList.bulkCreate([
      {
        movieId: 1
      },
      {
        movieId: 2
      },
      {
        movieId: 3
      }
    ]);

    console.log('----- WATCHLIST SEEDED -----');
  } catch (error) {
    console.error('Error seeding WatchList data:', error);
  }
};
