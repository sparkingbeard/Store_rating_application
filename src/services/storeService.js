import { Store, Rating, sequelize } from '../models/index.js';
import { Op } from 'sequelize';

// Create Store (Admin)
export const createStoreService = async (data) => {
  const { name, email, address, owner_id } = data;

  if (!name || !address) {
    throw new Error('Name and address are required');
  }

  const store = await Store.create({
    name,
    email,
    address,
    owner_id
  });

  return store;
};

export const getAllStoresService = async (userId, query = {}) => {
  const { name, address } = query;

  const stores = await Store.findAll({
    where: {
      ...(name && { name: { [Op.like]: `%${name}%` } }),
      ...(address && { address: { [Op.like]: `%${address}%` } })
    },
    include: [
      {
        model: Rating,
        attributes: []
      }
    ],
    attributes: {
      include: [
        [
          sequelize.fn('AVG', sequelize.col('Ratings.rating')),
          'avgRating'
        ]
      ]
    },
    group: ['Store.id']
  });

  // attach user rating
  const result = [];

  for (let store of stores) {
    const userRating = await Rating.findOne({
      where: {
        user_id: userId,
        store_id: store.id
      }
    });

    result.push({
      ...store.toJSON(),
      userRating: userRating ? userRating.rating : null
    });
  }

  return result;
};