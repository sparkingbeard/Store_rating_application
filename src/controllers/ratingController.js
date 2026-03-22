import {
  submitRatingService,
  updateRatingService
} from '../services/ratingService.js';

export const submitRating = async (req, res) => {
  try {
    const { rating } = req.body;
    const storeId = req.params.storeId;
    const userId = req.userId;

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
    const { rating } = req.body;
    const storeId = req.params.storeId;
    const userId = req.userId;

    const result = await updateRatingService(
      userId,
      storeId,
      rating
    );

    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};