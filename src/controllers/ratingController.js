import {
  submitRatingService,
  updateRatingService
} from '../services/ratingService.js';

export const submitRating = async (req, res) => {
  try {
    const { rating } = req.body;
    const {storeId} = req.params;
    const {userId} = req.user.id;

    const result = await submitRatingService(
      userId,
      storeId,
      rating
    );

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;

    const result = await updateRatingService(
      req.user.id,
      storeId,
      rating
    );

    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};