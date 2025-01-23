import sequelize from '../config/connection';
import { Movie, initModel as initMovieModel } from './movies';
import { SeenIt, initModel as initSeenItModel } from './seenIt';
import { Watchlist, initModel as initWatchlistModel } from './watchList';

// Initialize all models with the sequelize instance
initMovieModel(sequelize);
initSeenItModel(sequelize);
initWatchlistModel(sequelize);

// Set up associations
// Movie has many SeenIt records
Movie.hasMany(SeenIt, { foreignKey: 'movieId' });
SeenIt.belongsTo(Movie, { foreignKey: 'movieId', as: 'seenMovie' });

// Movie has many Watchlist records
Movie.hasMany(Watchlist, { foreignKey: 'movieId' });
Watchlist.belongsTo(Movie, { foreignKey: 'movieId', as: 'watchlistMovie' });

export { sequelize, Movie, SeenIt, Watchlist };
