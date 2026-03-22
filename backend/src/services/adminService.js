import { User, Store, Rating, sequelize } from '../models/index.js';

// Get dashboard stats
export const getAdminDashboardService = async () => {
  const totalUsers = await User.count();
  const totalStores = await Store.count();
  const totalRatings = await Rating.count();

  return { totalUsers, totalStores, totalRatings };
};


