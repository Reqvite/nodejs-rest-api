const { registration, login } = require("../service/authService");

const registrationController = async (req, res) => {
  const { email, password } = req.body;
  const { email: userEmail, subscription } = await registration(
    email,
    password
  );
  const user = { userEmail, subscription };
  res.status(201).json({ status: "Created", code: 201, user });
};

const loginContoller = async (req, res) => {
  const { email, password } = req.body;
  const token = await login(email, password);
  console.log(token);
  res.json({ status: "OK", code: 200, token });
};

const logoutContoller = async (req, res) => {
  res.json({ status: "succes" });
};

module.exports = {
  registrationController,
  loginContoller,
  logoutContoller,
};
