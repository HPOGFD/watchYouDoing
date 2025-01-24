import { WatchList } from '../models/watched.js';

export const seedWatchedList = async () => {
  
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
};
