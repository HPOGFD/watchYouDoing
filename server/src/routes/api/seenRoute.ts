import { Router } from 'express';
import { SeenIt } from '../../models/seen.js';

const router = Router();

/**
 * GET /seen
 * Fetch all "seen" movies from the database with updated fields
 */
router.get('/', async (_req, res) => {
  try {
    // Retrieve all entries from the SeenIt table with the specified fields
    const seenMovies = await SeenIt.findAll({
      attributes: ['movieId', 'viewedDate', 'rating', 'comment'], // Updated fields
    });

    res.status(200).json(seenMovies);
  } catch (error) {
    console.error('Error fetching seen movies:', error);
    res.status(500).json({ error: 'Unable to fetch seen movies' });
  }
});

export default router;
