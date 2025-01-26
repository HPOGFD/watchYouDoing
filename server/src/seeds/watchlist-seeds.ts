
import { WatchList } from '../models/index.js';

export const seedWatchedList = async () => {
  await WatchList.bulkCreate(
    [
      {
        movieId: 2,
        dateAdded: new Date('2025-01-25'),
        priority: 'Medium',
        notes: 'Classic drama, need to watch'
      }
    ],
    { individualHooks: true }
  );
};
