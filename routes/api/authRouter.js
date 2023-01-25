const express = require("express");
const { registrationController } = require("../../controllers/authController");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const router = express.Router();

router.post("/signup", asyncWrapper(registrationController));

module.exports = {
  authRouter: router,
};
