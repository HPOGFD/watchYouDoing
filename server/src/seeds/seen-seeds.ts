// seeds/seenItSeed.js
const SeenIt = require('../models/seenit');  // Adjust path to your SeenIt model
const MovieIndexModel = require('../models/index');   // Adjust path to your Index model
// const User = require('../models/user');  // Uncomment if you're using a user model

module.exports = async () => {
  // Assuming you have a specific user ID for '1'
  // Modify this to reflect actual user retrieval if needed

  const movieDarkKnight = await MovieIndexModel.findOne({ where: { title: 'The Dark Knight' } });

  // In this example, I'm hardcoding the user ID to '1'
  await SeenIt.bulkCreate([
    {
      userId: 1,  // Replace with actual user ID
      movieId: movieDarkKnight.id,
    },
  ]);

  console.log('SeenIt has been seeded!');
};
