import { Router } from 'express';
import { Watchlist } from '../../models/watchList.js';

const watchlistRouter = Router();

// GET all items in the watchlist
watchlistRouter.get('/', async (_req, res) => {
  try {
    const watchlist = await Watchlist.findAll(); // Fetch all watchlist items
    res.status(200).json(watchlist);
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    res.status(500).json({ message: 'Failed to fetch watchlist items.' });
  }
});

// POST a new item to the watchlist
watchlistRouter.post('/', async (req, res) => {
  try {
    const { movieId } = req.body; // Assuming a movieId is sent
    const newWatchlistItem = await Watchlist.create({ movieId });
    res.status(201).json(newWatchlistItem);
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    res.status(500).json({ message: 'Failed to add item to watchlist.' });
  }
});

// DELETE an item from the watchlist by its ID
watchlistRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Watchlist.destroy({ where: { id } });

    if (deleted) {
      res.status(200).json({ message: 'Item removed from watchlist.' });
    } else {
      res.status(404).json({ message: 'Item not found.' });
    }
  } catch (error) {
    console.error('Error deleting from watchlist:', error);
    res.status(500).json({ message: 'Failed to delete item from watchlist.' });
  }
});

export default watchlistRouter;
