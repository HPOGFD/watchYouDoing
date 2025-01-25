import { WatchList } from '../models/index.js';

export const seedWatchedList = async () => {
  await WatchList.bulkCreate(
    [
      {
        movieId: 1,
      },
      {
        movieId: 2,
      },
      {
        movieId: 3,
      },
    ],
    { individualHooks: true } // Ensures hooks are applied to each entry
  );
};
