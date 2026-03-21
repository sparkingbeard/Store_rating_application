import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Rating = sequelize.define('Rating', {
  rating: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  }
});

export default Rating;