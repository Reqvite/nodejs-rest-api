const express = require("express");
const {
  registrationController,
  registrationConfirmationController,
  loginContoller,
  logoutController,
  currentUserController,
  updateSubscriptionController,
  updateUserAvatarController,
} = require("../../controllers/authController");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { uploadMiddleware } = require("../../middlewares/filesMiddleWare");
const {
  authValidation,
  patchUserSubscriptionValidation,
} = require("../../middlewares/validationMiddleware");
const router = express.Router();

router.post("/signup", authValidation, asyncWrapper(registrationController));
router.post("/login", authValidation, asyncWrapper(loginContoller));
router.get("/current", authMiddleware, asyncWrapper(currentUserController));
router.get(
  "/verify/:verificationToken",
  asyncWrapper(registrationConfirmationController)
);
router.post("/logout", authMiddleware, asyncWrapper(logoutController));
router.patch(
  "/",
  authMiddleware,
  patchUserSubscriptionValidation,
  asyncWrapper(updateSubscriptionController)
);
router.patch(
  "/avatars",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  updateUserAvatarController
);

module.exports = {
  authRouter: router,
};
