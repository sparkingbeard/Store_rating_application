import express from 'express';
import { createStore, getAllStores } from '../controllers/storeController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Admin only
router.post('/', authMiddleware, roleMiddleware(['ADMIN']), createStore);

// All users
router.get('/', authMiddleware, getAllStores);

export default router;