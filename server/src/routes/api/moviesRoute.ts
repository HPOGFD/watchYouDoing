import express from 'express';
import type { Request, Response } from 'express';
import { Movie } from '../../models/movie.js';

const movieRouter = express.Router(); // Correct variable name



// POST a new movie
movieRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { title, genre, description, releaseDate, streamingStatus } = req.body;
    const newMovie = await Movie.create({ title, genre, description, releaseDate, streamingStatus }); // Correct model usage
    res.status(201).json(newMovie);
  } catch (error) {
    console.error('Error adding a movie:', error);
    res.status(500).json({ message: 'Failed to add the movie.' });
  }
});

export default movieRouter;
