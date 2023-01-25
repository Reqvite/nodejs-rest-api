const { registration } = require("../service/authService");

const registrationController = async (req, res) => {
  const { email, password } = req.body;
  await registration(email, password);
  res.json({ status: "succes" });
};

const loginContoller = async (req, res) => {
  res.json({ status: "succes" });
};

const logoutContoller = async (req, res) => {
  res.json({ status: "succes" });
};

module.exports = {
  registrationController,
  loginContoller,
  logoutContoller,
};
