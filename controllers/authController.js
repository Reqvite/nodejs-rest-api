const {
  registration,
  login,
  logout,
  currentUser,
} = require("../service/authService");

const registrationController = async (req, res) => {
  const { email, password } = req.body;
  const user = await registration(email, password);

  res.status(201).json({ status: "Created", code: 201, user });
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

module.exports = {
  registrationController,
  loginContoller,
  currentUserController,
  logoutController,
};
