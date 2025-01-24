import { WatchList, initModel } from '../models/watched.js';
import sequelize from '../config/connection.js';

// Initialize the model with the sequelize instance
initModel(sequelize);

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
    ], { validate: true });
};