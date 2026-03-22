import {
  createStoreService,
  getAllStoresService
} from '../services/storeService.js';

// ✅ Create Store (Admin)
export const createStore = async (req, res) => {
  try {
    const store = await createStoreService(req.body);

    res.status(201).json(store);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get All Stores (User)
export const getAllStores = async (req, res) => {
  try {
    const stores = await getAllStoresService(
      req.userId,
      req.query
    );

    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};