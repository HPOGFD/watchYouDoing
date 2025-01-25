import { Router } from 'express';
import { Movie } from '../../models/movie.js'; // Ensure your Movie model is imported
import { WatchList } from '../../models/watchlist.js'; // Ensure your WatchList model is imported

const watchlistRouter = Router();

// GET /watchlist - Retrieve all movies marked as 'watchlist'
watchlistRouter.get('/', async (_req, res) => {
    try {
        // Retrieve movies with status "watchlist"
        const watchlistMovies = await Movie.findAll({
            where: { status: 'watchlist' },
        });

        if (watchlistMovies.length === 0) {
            return res.status(404).json({ message: 'No watchlist movies found' });
        }

        // Respond with the list of watchlist movies
        return res.status(200).json({ watchlistMovies });
    } catch (error) {
        console.error('Error retrieving watchlist movies:', error);
        return res.status(500).json({ message: 'Server error. Could not retrieve watchlist movies.' });
    }
});

// POST /watchlist - Add a movie to the watchlist by its ID
watchlistRouter.post('/', async (req, res) => {
    try {
        const { movieId } = req.body;

        // Ensure movieId is provided
        if (!movieId) {
            return res.status(400).json({ message: 'Movie ID is required' });
        }

        // Check if movie exists
        const movie = await Movie.findByPk(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Create a new WatchList record for this movie
        await WatchList.create({ movieId });

        // Update movie status to 'watchlist'
        movie.status = 'watchlist';
        await movie.save();

        return res.status(201).json({ message: 'Movie added to watchlist' });
    } catch (error) {
        console.error('Error adding movie to watchlist:', error);
        return res.status(500).json({ message: 'Server error. Could not add movie to watchlist' });
    }
});

export default watchlistRouter;
