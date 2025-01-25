import { seedMovies } from './movie-seeds.js';
import { seedSeenMovies } from './seen-seeds.js';
import { seedWatchedList } from './watchlist-seeds.js';
import sequelize from '../config/connection.js';

const seedAll = async (): Promise<void> => {
  try {
    // Force sync to reset tables (drops existing ones)
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    // Seed the Movies table first
    await seedMovies();
    console.log('\n----- MOVIES SEEDED -----\n');

    // Seed the SeenIts table
    await seedSeenMovies();
    console.log('\n----- SEEN SEEDED -----\n');
    
    // Seed the WatchList table
    await seedWatchedList();
    console.log('\n----- WATCHLIST SEEDED -----\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
