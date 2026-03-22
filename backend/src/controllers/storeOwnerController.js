import { getStoreOwnerDashboardService } from '../services/storeOwnerService.js';

export const getStoreOwnerDashboard = async (req, res) => {
  try {
    const data = await getStoreOwnerDashboardService(req.userId);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};