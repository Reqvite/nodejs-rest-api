const { User } = require("../models/userModel");
const { RegistrationConflictError } = require("../helpers/errors");

const registration = async (email, password) => {
  try {
    const user = new User({
      email,
      password,
    });
    await user.save();
    return user;
  } catch (err) {
    throw new RegistrationConflictError("Email in use");
  }
};

const login = async () => {};

const logout = async () => {};

module.exports = {
  registration,
  login,
  logout,
};
