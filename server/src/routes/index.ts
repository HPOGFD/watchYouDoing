import apiRoutes from './api/index.js'
import express from 'express';
import  authRoutes  from './auth-routes.js';
import { authenticateToken } from '../middleware/auth.js';
const router = express.Router();

router.use('/api',authenticateToken, apiRoutes);
router.use('/auth', authRoutes);

export default router;
