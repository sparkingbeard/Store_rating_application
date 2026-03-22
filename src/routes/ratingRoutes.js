import express from 'express';
import {
  submitRating,
  updateRating
} from '../controllers/ratingController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/add/:storeId', authMiddleware, roleMiddleware(['USER']), submitRating);
router.put('/update', authMiddleware, roleMiddleware(['USER']), updateRating);

export default router;