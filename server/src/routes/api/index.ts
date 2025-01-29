import { Router } from 'express';
import movieRouter from './moviesRoute.js';
import watchlistRouter from './watchlistRoute.js';
import seenItRouter from './seenItRoute.js';
import { userRouter } from './user-routes.js';

const router = Router();

// Routes for the movie app
router.use('/movies', movieRouter); // Handles all '/movies' routes
router.use('/watchlist', watchlistRouter); // Handles all '/watchlist' routes
//router.use('/seenit', seenItRouter); // Handles all '/seenit' routes
router.use('/seenit', seenItRouter); // Handles all '/seenit' routes
router.use('/users', userRouter);

export default router;