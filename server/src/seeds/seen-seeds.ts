import { SeenIt, initModel } from '../models/seen.js';
import sequelize from '../config/connection.js';

// Initialize the model with the sequelize instance
initModel(sequelize);

export const seedSeenMovies = async () => {
    await SeenIt.bulkCreate([
      {
        movieId: 1,
        viewedDate: new Date('2024-01-01'),
        rating: 8,
        comment: 'Great movie, loved the plot!'
      },
      {
        movieId: 2,
        viewedDate: new Date('2024-01-10'),
        rating: 6,
        comment: 'Good movie, but a bit slow at times.'
      },
      {
        movieId: 3,
        viewedDate: new Date('2024-02-15'),
        rating: 9,
        comment: 'An excellent movie with great performances.'
      }
    ], { 
      validate: true 
    });
};