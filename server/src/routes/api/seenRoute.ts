import { Router } from 'express';
import { SeenIt } from '../../models/index.js';



const router = Router();

/**
 * GET /seen
 * Fetch all "seen" movies from the database with updated fields
 */
router.get('/', async (_req, res) => {
  try {
    const seenMovies = await SeenIt.findAll({
      attributes: ['movieId', 'viewedDate', 'rating', 'comment'],
    });

    // Convert Sequelize instances to plain objects
    const plainMovies = seenMovies.map(movie => movie.toJSON()); // or movie.get({ plain: true })

    console.log('Fetched seen movies:', plainMovies);
    res.status(200).json(plainMovies); // Send plain objects
  } catch (error) {
    console.error('Error fetching seen movies:', error);
    res.status(500).json({ error: 'Unable to fetch seen movies' });
  }
});

router.delete('/:movieId', async (req, res) => {
  const { movieId } = req.params;

  try {
    // Find and delete the movie by its ID
    const movie = await SeenIt.findOne({ where: { movieId } });

    if (!movie) {
      return res.status(404).json({ error: `Movie with ID ${movieId} not found` });
    }

    await movie.destroy(); // Delete the movie record
    console.log(`Movie with ID ${movieId} deleted successfully`);

    return res.status(200).json({ message: `Movie with ID ${movieId} deleted successfully` });
  } catch (error) {
    console.error('Error deleting movie:', error);
    return res.status(500).json({ error: 'Unable to delete movie' });
  }
});


export default router;
