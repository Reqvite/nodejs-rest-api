const { User } = require("../models/userModel");
const {
  RegistrationConflictError,
  NotAuthorizideError,
} = require("../helpers/errors");
const jwt = require("jsonwebtoken");

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

const login = async (email, password) => {
  const user = await User.findOne(
    { email },
    { email: 1, subscription: 1, _id: 1 }
  );
  if (!user) {
    throw new NotAuthorizideError("Email or password is wrong");
  }
  console.log(user);
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );
  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

const logout = async () => {};

module.exports = {
  registration,
  login,
  logout,
};
