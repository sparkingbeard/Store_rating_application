import express from 'express';
import {
  submitRating,
  updateRating
} from '../controllers/ratingController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, submitRating);
router.put('/', authMiddleware, updateRating);

export default router;