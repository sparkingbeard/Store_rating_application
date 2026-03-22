import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
import { getStoreOwnerDashboard } from '../controllers/storeOwnerController.js';

const router = express.Router();

// Only STORE_OWNER access
router.use(authMiddleware, roleMiddleware(['STORE_OWNER', 'ADMIN']));

router.get('/dashboard', getStoreOwnerDashboard);

export default router;