import { Store, Rating, User } from '../models/index.js';
import { sequelize } from '../models/index.js';

// Get all users who rated my store + average rating
export const getStoreOwnerDashboardService = async (ownerId) => {
  // Get all stores owned by this user
  const stores = await Store.findAll({
    where: { owner_id: ownerId }
  });

  const result = [];

  for (let store of stores) {
    // Average rating
    const avg = await Rating.findOne({
      where: { store_id: store.id },
      attributes: [
        [sequelize.fn('AVG', sequelize.col('rating')), 'avgRating']
      ]
    });

    // Users who rated this store
    const ratings = await Rating.findAll({
      where: { store_id: store.id },
      include: [{ model: User, attributes: ['id', 'name', 'email', 'address'] }]
    });

    result.push({
      store: store.toJSON(),
      avgRating: avg.dataValues.avgRating || 0,
      ratings: ratings.map(r => ({
        user: r.User,
        rating: r.rating
      }))
    });
  }

  return result;
};