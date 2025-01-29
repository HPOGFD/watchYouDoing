import { Router } from 'express';
import { WatchList } from '../../models/index.js';
import { SeenIt } from '../../models/seen.js';

const router = Router();

/**
 * GET /watchlist
 * Fetch all movies from the watchlist
 */
router.get('/', async (_req, res) => {
  try {
    const watchlistMovies = await WatchList.findAll({
      attributes: ['movieId', 'dateAdded', 'priority', 'notes'],
    });

    // Convert Sequelize instances to plain objects
    const plainWatchlistMovies = watchlistMovies.map(movie => movie.get({ plain: true }));

    console.log('Executing: SELECT "movieId", "dateAdded", "priority", "notes" FROM "WatchLists" AS "WatchList";');
    console.log('Fetched watchlist movies:', plainWatchlistMovies);

    res.status(200).json(plainWatchlistMovies);
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
    console.log(`Attempting to delete movie with ID ${movieId} from watchlist`);

    const deletedCount = await WatchList.destroy({
      where: { movieId: movieId }
    });

    console.log(`Executing: DELETE FROM "WatchLists" WHERE "movieId" = ${movieId}`);
    console.log(`Deleted count: ${deletedCount}`);

    if (deletedCount === 0) {
      console.log(`Movie with ID ${movieId} not found in watchlist`);
      return res.status(404).json({ message: 'Movie not found in watchlist' });
    }

    console.log(`Successfully removed movie with ID ${movieId} from watchlist`);
    return res.status(200).json({ message: 'Movie removed from watchlist successfully' });
  } catch (error) {
    console.error('Error removing movie from watchlist:', error);
    return res.status(500).json({ error: 'Unable to remove movie from watchlist' });
  }
});

// Add movie from watchlist to seen list
router.post('/move-to-seen/:movieId', async (req, res) => {
  const { movieId } = req.params;

  try {
    // Fetch movie from WatchList
    const movie = await WatchList.findOne({ where: { movieId } });

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found in watchlist' });
    }

    // Create the movie in SeenList table (move to Seen It)
    await SeenIt.create({
      movieId: movie.movieId,
      viewedDate: new Date(), // You can pass additional data as needed
      rating: movie.rating,
      comment: movie.comment,
    });

    // Optionally, remove it from the watchlist
    await movie.destroy();

    console.log(`Movie ${movieId} moved to seen list`);
    return res.status(200).json({ message: `Movie ${movieId} successfully added to Seen It` });
  } catch (error) {
    console.error('Error moving movie to seen list:', error);
    return res.status(500).json({ error: 'Unable to move movie to seen list' });
  }
});


export default router;
