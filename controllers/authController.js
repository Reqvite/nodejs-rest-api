const {
  registration,
  login,
  logout,
  currentUser,
  updateSubscription,
  updateUserAvatar,
  registrationConfirmation,
  resendVerificationEmail,
} = require("../service/authService");

const registrationController = async (req, res) => {
  const { email, password } = req.body;
  const user = await registration(email, password);
  res.status(201).json({ status: "Created", code: 201, user });
};

const registrationConfirmationController = async (req, res) => {
  const { verificationToken } = req.params;

  await registrationConfirmation(verificationToken);

  res.json({ status: "OK", code: 200, message: "Verification successful" });
};

const resendVerificationEmailController = async (req, res) => {
  const { email } = req.body;

  await resendVerificationEmail(email);

  res.json({ status: "OK", code: 200, message: "Verification email sent" });
};

const loginContoller = async (req, res) => {
  const { email, password } = req.body;
  const token = await login(email, password);
  res.json({ status: "OK", code: 200, token });
};

const currentUserController = async (req, res) => {
  const user = await currentUser(req.user.token);
  res.status(200).json({ status: "OK", code: 200, user });
};

const logoutController = async (req, res) => {
  await logout(req.user._id);
  res.status(204).json({ status: "No Content", code: 204 });
};

const updateSubscriptionController = async (req, res) => {
  const updatedUser = await updateSubscription(req.user._id, req.body);
  res.status(200).json({ status: "Updated", code: 200, updatedUser });
};

const updateUserAvatarController = async (req, res) => {
  const avatarURL = await updateUserAvatar(
    { photo: req.file, id: req.user._id },
    req.body
  );
  res.status(200).json({ status: "OK", code: 200, avatarURL });
};

module.exports = {
  registrationController,
  registrationConfirmationController,
  loginContoller,
  currentUserController,
  logoutController,
  updateSubscriptionController,
  updateUserAvatarController,
  resendVerificationEmailController,
};
