import { Router } from 'express';
import movieRouter from './moviesRoute.js';
import watchlistRouter from './watchlistRoute.js';
import seenRouter from './seenRoute.js';

const router = Router();

// Routes for the movie app
router.use('/movies', movieRouter); // Handles all '/movies' routes
router.use('/watchlist', watchlistRouter); // Handles all '/watchlist' routes
router.use('/seen', seenRouter); // Handles all '/seenit' routes


export default router;
