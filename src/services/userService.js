// Get all users with optional filters
export const getAllUsersService = async (filters = {}) => {
  const { name, email, address, role } = filters;

  const users = await User.findAll({
  attributes: { exclude: ['password'] },
  where: {
    ...(name && { name: { [Op.like]: `%${name}%` } }),
    ...(email && { email: { [Op.like]: `%${email}%` } }),
    ...(address && { address: { [Op.like]: `%${address}%` } }),
    ...(role && { role })
  }
});
return users;
};