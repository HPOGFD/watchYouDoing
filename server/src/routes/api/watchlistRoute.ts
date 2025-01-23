import express from 'express';
import type { Request, Response } from 'express';
import { Watchlist } from '../../models/watchList.js';

const watchListRouter = express.Router();

// GET all movies in the watchlist
watchListRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const watchlistMovies = await Watchlist.findAll();
    res.status(200).json(watchlistMovies);
  } catch (error) {
    console.error('Error fetching watchlist movies:', error);
    res.status(500).json({ message: 'Failed to fetch watchlist movies.' });
  }
});

// POST a new movie to the watchlist
watchListRouter.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { movieId } = req.body;

    // Validate that movieId is provided
    if (!movieId) {
      res.status(400).json({ message: 'movieId is required.' });
      return;
    }

    // Create a new entry in the "Watchlist" table
    const newWatchlistMovie = await Watchlist.create({ movieId });
    res.status(201).json(newWatchlistMovie);
  } catch (error) {
    console.error('Error adding to Watchlist:', error);
    res.status(500).json({ message: 'Failed to add the movie to Watchlist.' });
  }
});

// DELETE a movie from the watchlist
watchListRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await Watchlist.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: 'Movie not found in Watchlist.' });
    }

    return res.status(200).json({ message: 'Movie successfully removed from Watchlist.' });
  } catch (error) {
    console.error('Error deleting from Watchlist:', error);
    return res.status(500).json({ message: 'Failed to remove the movie from Watchlist.' });
  }
});

export default watchListRouter;
