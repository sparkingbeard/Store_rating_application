import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { roleMiddleware } from '../middleware/roleMiddleware.js';
import {
  getAdminDashboard,
  getAllUsers,
  getAllStores
} from '../controllers/adminController.js';

const router = express.Router();

// Only ADMIN access
router.use(authMiddleware, roleMiddleware(['ADMIN']));

router.get('/dashboard', getAdminDashboard);
router.get('/users', getAllUsers);
router.get('/stores', getAllStores);

export default router;