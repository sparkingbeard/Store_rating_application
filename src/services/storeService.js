import { Store, Rating, sequelize } from '../models/index.js';
import { Op } from 'sequelize';

// Create Store (Admin)
export const createStoreService = async (data) => {
  const { name, email, address, owner_id } = data;

  if (!name || !address) {
    throw new Error('Name and address are required');
  }

  return await Store.create({ name, email, address, owner_id });
};

// Get all stores with average ratings AND specific user's rating
export const getAllStoresService = async (userId, filters = {}) => {
  const { name, email, address } = filters;

  const stores = await Store.findAll({
    where: {
      ...(name && { name: { [Op.like]: `%${name}%` } }),
      ...(email && { email: { [Op.like]: `%${email}%` } }),
      ...(address && { address: { [Op.like]: `%${address}%` } })
    },
    attributes: {
      include: [
        // Calculate Global Average Rating
        [
          sequelize.fn('AVG', sequelize.col('Ratings.rating')),
          'avgRating'
        ],
        // Optimization: Subquery to get the specific user's rating without a loop
        [
          sequelize.literal(`(
            SELECT rating FROM Ratings 
            WHERE Ratings.store_id = Store.id 
            AND Ratings.user_id = ${sequelize.escape(userId)} 
            LIMIT 1
          )`),
          'userRating'
        ]
      ]
    },
    include: [
      {
        model: Rating,
        attributes: [] // Keep this empty so we don't return all rating objects
      }
    ],
    group: ['Store.id'],
    subQuery: false // Necessary when using group by and limits in Sequelize
  });

  return stores;
};