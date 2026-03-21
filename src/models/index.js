import sequelize from "../config/database.js";
import User from './Users.js';
import Store from './Stores.js';
import Rating from './Ratings.js';

// relations between tables
User.hasMany(Store, { foreignKey: 'owner_id' });
Store.belongsTo(User, { foreignKey: 'owner_id' });

User.hasMany(Rating, { foreignKey: 'user_id' });
Rating.belongsTo(User, { foreignKey: 'user_id' });

Store.hasMany(Rating, { foreignKey: 'store_id' });
Rating.belongsTo(Store, { foreignKey: 'store_id' });

export {
  sequelize,
  User,
  Store,
  Rating
};
