import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING(400)
  },
  role: {
    type: DataTypes.ENUM('ADMIN', 'USER', 'STORE_OWNER'),
    defaultValue: 'USER'
  }
});

export default User;