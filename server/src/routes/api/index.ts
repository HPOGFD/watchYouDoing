import { Router } from 'express';
import movieRouter from './moviesRoute.js';
import watchlistRouter from './watchedlistRoute.js';
import seenItRouter from './seenRoute.js';

const router = Router();

// Routes for the movie app
router.use('/movies', movieRouter); // Handles all '/movies' routes
router.use('/watchlist', watchlistRouter); // Handles all '/watchlist' routes
router.use('/seenit', seenItRouter); // Handles all '/seenit' routes

export default router;
