const { User } = require("../models/userModel");

const registration = async (email, password) => {
  const user = new User({
    email,
    password,
  });
  await user.save();

  return user;
};

const login = async () => {};

const logout = async () => {};

module.exports = {
  registration,
  login,
  logout,
};
