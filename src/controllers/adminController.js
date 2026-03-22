import {getAdminDashboardService} from '../services/adminService.js';
import { getAllUsersService } from '../services/userService.js';

export const getAdminDashboard = async (req, res) => {
  try {
    const stats = await getAdminDashboardService();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService(req.query);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllStores = async (req, res) => {
  try {
    const stores = await getAllStoresService(req.query);
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};