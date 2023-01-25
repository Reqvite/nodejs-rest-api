const express = require("express");
const {
  registrationController,
  loginContoller,
  logoutController,
  currentUserController,
} = require("../../controllers/authController");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { authValidation } = require("../../middlewares/validationMiddleware");
const router = express.Router();

router.post("/signup", authValidation, asyncWrapper(registrationController));
router.post("/login", authValidation, asyncWrapper(loginContoller));
router.post("/current", authMiddleware, asyncWrapper(currentUserController));
router.post("/logout", authMiddleware, asyncWrapper(logoutController));

module.exports = {
  authRouter: router,
};
