// seeds/watchlistSeed.js
const Watchlist = require('../models/watchlist'); // Adjust path to your Watchlist model
const Index = require('../models/index');         // Adjust path to your Index model
// const User = require('../models/user'); // Uncomment if you're implementing users and use them for IDs

module.exports = async () => {
  // Assuming you have a specific user or hard-coded user ID (e.g., 1)
  // If you add user authentication, replace this with a query to get a user from DB

  const movieInception = await Index.findOne({ where: { title: 'Inception' } });
  const movieMatrix = await Index.findOne({ where: { title: 'The Matrix' } });

  // In this example, I'm hardcoding the user ID to '1' (replace with actual logic if you have a User model)
  await Watchlist.bulkCreate([
    {
      userId: 1,  // Replace with actual logic to get user ID
      movieId: movieInception.id,
    },
    {
      userId: 1,  // Replace with actual logic to get user ID
      movieId: movieMatrix.id,
    },
  ]);

  console.log('Watchlist has been seeded!');
};
