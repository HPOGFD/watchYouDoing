import { Router } from 'express';
import { Movie } from '../../models/movie'; // Ensure your Movie model is imported
import { SeenIt } from '../../models/seen'; // Ensure your SeenIt model is imported

const seenRouter = Router();

// GET /seen - Retrieve all movies marked as 'seen'
seenRouter.get('/', async (_req, res) => {
    try {
        // Retrieve movies with status "seen"
        const seenMovies = await Movie.findAll({
            where: { status: 'seen' },
        });

        if (seenMovies.length === 0) {
            return res.status(404).json({ message: 'No seen movies found' });
        }

        // Respond with the list of seen movies
        return res.status(200).json({ seenMovies });
    } catch (error) {
        console.error('Error retrieving seen movies:', error);
        return res.status(500).json({ message: 'Server error. Could not retrieve seen movies.' });
    }
});

// POST /seen - Mark a movie as seen by adding its ID
seenRouter.post('/', async (req, res) => {
    try {
        const { movieId } = req.body;

        // Make sure movieId is provided
        if (!movieId) {
            return res.status(400).json({ message: 'Movie ID is required' });
        }

        // Check if movie exists
        const movie = await Movie.findByPk(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Create a new SeenIt record for this movie
        await SeenIt.create({ movieId, viewedDate: new Date(), rating: 5 });

        // Update the movie status to 'seen'
        movie.status = 'seen';
        await movie.save();

        return res.status(201).json({ message: 'Movie marked as seen' });
    } catch (error) {
        console.error('Error marking movie as seen:', error);
        return res.status(500).json({ message: 'Server error. Could not mark movie as seen' });
    }
});

export default seenRouter;
