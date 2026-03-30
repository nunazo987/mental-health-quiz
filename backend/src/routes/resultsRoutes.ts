import express from 'express';
import { createResult, getMyResults } from '../controllers/resultsControllers.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createResult);
router.get('/me', authMiddleware, getMyResults);

export default router;