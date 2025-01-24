import sequelize from '../config/connection';
import { Movie, initModel as initMovieModel } from './movie';
import { SeenIt, initModel as initSeenItModel } from './seen';
import { WatchList, initModel as initWatchlistModel } from './watched';

// Initialize all models with the sequelize instance
initMovieModel(sequelize);
initSeenItModel(sequelize);
initWatchlistModel(sequelize);

// Set up associations
// Movie has many SeenIt records
Movie.hasMany(SeenIt, { foreignKey: 'movieId' });
SeenIt.belongsTo(Movie, { foreignKey: 'movieId', as: 'seenMovie' });

// Movie has many Watchlist records
Movie.hasMany(WatchList, { foreignKey: 'movieId' });
WatchList.belongsTo(Movie, { foreignKey: 'movieId', as: 'watchlistMovie' });

export { sequelize, Movie, SeenIt, WatchList };
