import express from 'express';
import type { Request, Response } from 'express';
import { Movie } from '../../models/movie.js';

const movieRouter = express.Router(); // Correct variable name



movieRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { title, genre, description, releaseDate, streamingStatus, status } = req.body;

    // Include `status` in the request body
    const newMovie = await Movie.create({ 
      title, 
      genre, 
      description, 
      releaseDate, 
      streamingStatus, 
      status 
    });

    res.status(201).json(newMovie);
  } catch (error) {
    console.error('Error adding a movie:', error);
    res.status(500).json({ message: 'Failed to add the movie.' });
  }
});


export default movieRouter;
