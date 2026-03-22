import { Rating } from '../models/index.js';

// 🔹 Submit Rating
export const submitRatingService = async (userId, storeId, rating) => {
  // check if already exists
  const existing = await Rating.findOne({
    where: { user_id: userId, store_id: storeId }
  });

  if (existing) {
    throw new Error('Rating already exists. Use update.');
  }

  const newRating = await Rating.create({
    user_id: userId,
    store_id: storeId,
    rating
  });

  return newRating;
};

// 🔹 Update Rating
export const updateRatingService = async (userId, storeId, rating) => {
  const existing = await Rating.findOne({
    where: { user_id: userId, store_id: storeId }
  });

  if (!existing) {
    throw new Error('Rating not found');
  }

  existing.rating = rating;
  await existing.save();

  return existing;
};