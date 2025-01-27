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

export default router;
