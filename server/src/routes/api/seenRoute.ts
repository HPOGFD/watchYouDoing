import express from 'express';
import type { Request, Response } from 'express';
import { SeenIt } from '../../models/seen.js';

const seenItRouter = express.Router();

// GET all seen movies
seenItRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const seenMovies = await SeenIt.findAll();
    res.status(200).json(seenMovies);
  } catch (error) {
    console.error('Error fetching seen movies:', error);
    res.status(500).json({ message: 'Failed to fetch seen movies.' });
  }
});

// POST a new movie to "SeenIt"
seenItRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { movieId } = req.body;

    // Validate that the movieId is provided
    if (!movieId) {
      return res.status(400).json({ message: 'movieId is required.' });
    }

    // Create a new entry in the "SeenIt" table
    const newSeenMovie = await SeenIt.create({ movieId });
    return res.status(201).json(newSeenMovie);
  } catch (error) {
    console.error('Error adding to SeenIt:', error);
    return res.status(500).json({ message: 'Failed to add the movie to SeenIt.' });
  }
});

// DELETE a movie from "SeenIt"
seenItRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await SeenIt.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: 'Movie not found in SeenIt.' });
    }

    return res.status(200).json({ message: 'Movie successfully removed from SeenIt.' });
  } catch (error) {
    console.error('Error deleting from SeenIt:', error);
    return res.status(500).json({ message: 'Failed to remove the movie from SeenIt.' });
  }
});

export default seenItRouter;
