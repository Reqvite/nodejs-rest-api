const express = require("express");
const { registrationController } = require("../../controllers/authController");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  registrationValidation,
} = require("../../middlewares/validationMiddleware");
const router = express.Router();

router.post(
  "/signup",
  registrationValidation,
  asyncWrapper(registrationController)
);

module.exports = {
  authRouter: router,
};
