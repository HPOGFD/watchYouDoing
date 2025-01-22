import { Router } from 'express';
import { SeenIt } from '../../models/seenIt';

const seenItRouter = Router();

// GET all items in SeenIt list
seenItRouter.get('/', async (_req, res) => {
  try {
    const seenIt = await SeenIt.findAll(); // Fetch all items from SeenIt
    res.status(200).json(seenIt);
  } catch (error) {
    console.error('Error fetching SeenIt list:', error);
    res.status(500).json({ message: 'Failed to fetch SeenIt list.' });
  }
});

// POST a new item to SeenIt
seenItRouter.post('/', async (req, res) => {
  try {
    const { movieId } = req.body; // Assuming a movieId is sent
    const newSeenItItem = await SeenIt.create({ movieId });
    res.status(201).json(newSeenItItem);
  } catch (error) {
    console.error('Error adding to SeenIt:', error);
    res.status(500).json({ message: 'Failed to add item to SeenIt.' });
  }
});

// DELETE an item from SeenIt list by its ID
seenItRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await SeenIt.destroy({ where: { id } });

    if (deleted) {
      res.status(200).json({ message: 'Item removed from SeenIt.' });
    } else {
      res.status(404).json({ message: 'Item not found in SeenIt.' });
    }
  } catch (error) {
    console.error('Error deleting from SeenIt:', error);
    res.status(500).json({ message: 'Failed to delete item from SeenIt.' });
  }
});

export default seenItRouter;
