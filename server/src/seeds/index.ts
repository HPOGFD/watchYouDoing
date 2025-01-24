import { seedSeenMovies } from './seen-seeds.js';
import { seedWatchedList } from './watched-seeds.js';
import sequelize from '../config/connection.js';

const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    await seedSeenMovies();
    console.log('\n----- SEEN SEEDED -----\n');
    
    await seedWatchedList();
    console.log('\n----- WATCHED SEEDED -----\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
