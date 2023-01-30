const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const sgMail = require("@sendgrid/mail");
const { User } = require("../models/userModel");
const {
  RegistrationConflictError,
  NotAuthorizideError,
  WrongParametersError,
  RestApiError,
} = require("../helpers/errors");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const registration = async (email, password) => {
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();
  try {
    const user = new User({
      email,
      password,
      avatarURL,
      verificationToken,
    });
    await user.save();

    const msg = {
      to: email,
      from: "reqvite2233@gmail.com",
      subject: "Rest API verification",
      text: `Follow the link to confirm your registration http://localhost:3000/api/users/verify/${verificationToken}`,
      html: `<h2>Follow the link to confirm your registration:<a href="http://localhost:3000/api/users/verify/${verificationToken}">Verification token</a><h2>`,
    };

    await sgMail.send(msg);

    return {
      email: user.email,
      subscription: user.subscription,
    };
  } catch (err) {
    throw new RegistrationConflictError("Email in use");
  }
};

const registrationConfirmation = async (verificationToken) => {
  const verification = await User.findOne({ verificationToken });
  if (!verification) {
    throw new WrongParametersError("Not found");
  }
  await User.findByIdAndUpdate(verification._id, {
    $set: { verify: true, verificationToken: null },
  });
};

const resendVerificationEmail = async (email) => {
  const verificationToken = uuidv4();
  const { verify } = await User.findOne({ email });

  if (verify) {
    throw new RestApiError("Verification has already been passed");
  }

  const user = await User.findOneAndUpdate({ email }, { verificationToken });
  const msg = {
    to: email,
    from: "reqvite2233@gmail.com",
    subject: "Rest API verification",
    text: `Follow the link to confirm your registration http://localhost:3000/api/users/verify/${verificationToken}`,
    html: `<h2>Follow the link to confirm your registration:<a href="http://localhost:3000/api/users/verify/${verificationToken}">Verification token</a><h2>`,
  };

  await sgMail.send(msg);

  return {
    email: user.email,
    subscription: user.subscription,
  };
};

const login = async (email, password) => {
  const { verify } = await User.findOne({ email });
  if (!verify) {
    throw new NotAuthorizideError("Please confirm your registration.");
  }
  const user = await User.findOne({ email, verify: true });
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

const updateUserAvatar = async ({ photo, id }) => {
  const { path: photoPath, originalname } = photo;
  const fileName = `${id}_${uuidv4()}_${originalname}`;
  const resultPath = path.join(__dirname, "../public/avatars", fileName);
  const file = await Jimp.read(photoPath);
  await file.resize(250, 250).writeAsync(resultPath);
  fs.unlink(photoPath);
  const user = await User.findByIdAndUpdate(
    id,
    {
      avatarURL: resultPath,
    },
    { new: true }
  );

  if (!user) {
    throw new WrongParametersError(`Not found`);
  }
  return { avatarURL: user.avatarURL };
};

module.exports = {
  registration,
  login,
  logout,
  currentUser,
  updateSubscription,
  updateUserAvatar,
  registrationConfirmation,
  resendVerificationEmail,
};
