import { Router } from 'express';
import { WatchList } from '../../models/index.js';

const router = Router();

/**
 * GET /watchlist
 * Fetch all movies from the watchlist
 */
router.get('/', async (_req, res) => {
  try {
    const watchlistMovies = await WatchList.findAll({
      attributes: ['movieId', 'dateAdded', 'priority', 'notes'], // Adjust these fields as per your WatchList model
    });

    res.status(200).json(watchlistMovies);
  } catch (error) {
    console.error('Error fetching watchlist movies:', error);
    res.status(500).json({ error: 'Unable to fetch watchlist movies' });
  }
});

/**
 * DELETE /watchlist/:movieId
 * Remove a movie from the watchlist
 */
router.delete('/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    const deletedCount = await WatchList.destroy({
      where: { movieId: movieId }
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Movie not found in watchlist' });
    }

    return res.status(200).json({ message: 'Movie removed from watchlist successfully' });
  } catch (error) {
    console.error('Error removing movie from watchlist:', error);
    return res.status(500).json({ error: 'Unable to remove movie from watchlist' });
  }
});

export default router;
