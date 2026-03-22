import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import { sequelize } from './src/models/index.js';

// Import routes
import authRoutes from './src/routes/authRoutes.js';
import storeRoutes from './src/routes/storeRoutes.js';
import ratingRoutes from './src/routes/ratingRoutes.js';

import adminRoutes from './src/routes/adminRoutes.js';
import storeOwnerRoutes from './src/routes/storeOwnerRoutes.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect routes to controllers
app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);

// Admin
app.use('/api/admin', adminRoutes);

// Store Owner
app.use('/api/store-owner', storeOwnerRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');

    await sequelize.sync({force: false});
    console.log('Database synced');

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });

  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();