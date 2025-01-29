import express from 'express';
import type { Request, Response } from 'express';
import { Movie } from '../../models/movie.js';

// Create a new router instance for movie-related routes
const movieRouter = express.Router();

// POST route to create a new movie
movieRouter.post('/', async (req: Request, res: Response) => {
  try {
    // Extract movie details from the request body
    const { title, genre, description, releaseDate, streamingStatus, status } = req.body;

    // Log the incoming data for debugging
    console.log('Attempting to create a new movie with data:', {
      title, genre, description, releaseDate, streamingStatus, status
    });

    // Create a new movie entry in the database
    const newMovie = await Movie.create({ 
      title, 
      genre, 
      description, 
      releaseDate, 
      streamingStatus, 
      status 
    });

    // Convert Sequelize instance to a plain JavaScript object
    const plainMovie = newMovie.get({ plain: true });

    // Log the newly created movie for debugging
    console.log('New movie created successfully:', plainMovie);

    // Send a 201 (Created) response with the new movie data
    res.status(201).json(plainMovie);
  } catch (error) {
    // Log any errors that occur during movie creation
    console.error('Error adding a movie:', error);
    // Send a 500 (Internal Server Error) response if movie creation fails
    res.status(500).json({ message: 'Failed to add the movie.' });
  }
});

// GET route to fetch all movies
movieRouter.get('/', async (_req: Request, res: Response) => {
  try {
    // Fetch all movies from the database
    const movies = await Movie.findAll();

    // Convert Sequelize instances to plain JavaScript objects
    const plainMovies = movies.map(movie => movie.get({ plain: true }));

    // Log the fetched movies for debugging
    console.log('Fetched movies:', plainMovies);

    // Send a 200 (OK) response with the list of movies
    res.status(200).json(plainMovies);
  } catch (error) {
    // Log any errors that occur during movie fetching
    console.error('Error fetching movies:', error);
    // Send a 500 (Internal Server Error) response if fetching fails
    res.status(500).json({ message: 'Failed to fetch movies.' });
  }
});

// POST route to add a movie to the watchlist
movieRouter.post('/api/watchlist/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    movie.status = 'watchlist';
    await movie.save();
    return res.status(200).json({ message: 'Movie added to watchlist', movie });
  } catch (error) {
    console.error('Error adding movie to watchlist:', error);
    return res.status(500).json({ message: 'Failed to add movie to watchlist' });
  }
});

// Export the router for use in the main app
export default movieRouter;
