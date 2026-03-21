import { User, Store, Rating, sequelize } from '../models/index.js';
import { Op } from 'sequelize';

// Get dashboard stats
export const getAdminDashboardService = async () => {
  const totalUsers = await User.count();
  const totalStores = await Store.count();
  const totalRatings = await Rating.count();

  return { totalUsers, totalStores, totalRatings };
};

// Get all users with optional filters
export const getAllUsersService = async (filters = {}) => {
  const { name, email, address, role } = filters;

  const users = await User.findAll({
  attributes: { exclude: ['password'] },
  where: {
    ...(name && { name: { [Op.like]: `%${name}%` } }),
    ...(email && { email: { [Op.like]: `%${email}%` } }),
    ...(address && { address: { [Op.like]: `%${address}%` } }),
    ...(role && { role })
  }
});
return users;
};

// Get all stores with average ratings
export const getAllStoresService = async (filters = {}) => {
  const { name, email, address } = filters;

  const stores = await Store.findAll({
    where: {
      ...(name && { name: { [Op.like]: `%${name}%` } }),
      ...(email && { email: { [Op.like]: `%${email}%` } }),
      ...(address && { address: { [Op.like]: `%${address}%` } })
    },
    attributes: {
      include: [
        [
          sequelize.fn('AVG', sequelize.col('Ratings.rating')),
          'avgRating'
        ]
      ]
    },
    include: [
      {
        model: Rating,
        attributes: []
      }
    ],
    group: ['Store.id']
  });

  return stores;
};