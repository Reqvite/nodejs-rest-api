const { User } = require("../models/userModel");
const {
  RegistrationConflictError,
  NotAuthorizideError,
  WrongParametersError,
} = require("../helpers/errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registration = async (email, password) => {
  try {
    const user = new User({
      email,
      password,
    });
    await user.save();
    return {
      email: user.email,
      subscription: user.subscription,
    };
  } catch (err) {
    throw new RegistrationConflictError("Email in use");
  }
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotAuthorizideError("Email or password is wrong");
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizideError("Email or password is wrong");
  }
  const id = user._id;
  const token = jwt.sign(
    {
      _id: id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );
  await User.findByIdAndUpdate(id, {
    $set: { token },
  });
  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

const logout = async (id) => {
  if (!id) {
    throw new NotAuthorizideError("Not authorized");
  }
  await User.findByIdAndUpdate(id, {
    $set: { token: null },
  });
};

const currentUser = async (token) => {
  if (!token) {
    throw new NotAuthorizideError("Not authorized");
  }
  return await User.findOne({ token }, { email: 1, subscription: 1, _id: 0 });
};

const updateSubscription = async (id, { subscription }) => {
  const user = await User.findByIdAndUpdate(
    id,
    {
      subscription,
    },
    { new: true }
  );

  if (!user) {
    throw new WrongParametersError(`Not found`);
  }
  return { email: user.email, subscription: user.subscription };
};

module.exports = {
  registration,
  login,
  logout,
  currentUser,
  updateSubscription,
};
