const express = require("express");
const {
  registrationController,
  registrationConfirmationController,
  loginContoller,
  logoutController,
  currentUserController,
  updateSubscriptionController,
  updateUserAvatarController,
  resendVerificationEmailController,
} = require("../../controllers/authController");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { uploadMiddleware } = require("../../middlewares/filesMiddleWare");
const {
  authValidation,
  patchUserSubscriptionValidation,
  resendVerificationEmailValidation,
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
router.post(
  "/verify/",
  resendVerificationEmailValidation,
  asyncWrapper(resendVerificationEmailController)
);
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
