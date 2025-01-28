import { Router } from 'express';
import Index from '../../models/index.js'; // Assuming 'Index' is your Movie model

const movieRouter = Router();

// GET all movies
movieRouter.get('/', async (_req, res) => {
  try {
    const movies = await Index.findAll(); // Fetch all movies
    res.status(200).json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: 'Failed to fetch movies.' });
  }
});

// POST a new movie
movieRouter.post('/', async (req, res) => {
  try {
    const { title, genre, description, releaseDate, streamingStatus } = req.body;
    const newMovie = await Index.create({ title, genre, description, releaseDate, streamingStatus });
    res.status(201).json(newMovie);
  } catch (error) {
    console.error('Error adding a movie:', error);
    res.status(500).json({ message: 'Failed to add the movie.' });
  }
});

export default movieRouter;
