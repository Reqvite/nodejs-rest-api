const express = require("express");
const router = express.Router();

const {
  postValidation,
  patchPostValidation,
} = require("../../middlewares/validationMiddleware");
const {
  getContactsController,
  getContactByIdContoller,
  addNewContactController,
  deleteContactController,
  updateContactByIdContoller,
  updateStatusContactController,
} = require("../../controllers/contactsController");

const { asyncWrapper } = require("../../helpers/apiHelpers");
const { authMiddleware } = require("../../middlewares/authMiddleware");

router.use(authMiddleware);

router.get("/", asyncWrapper(getContactsController));
router.get("/:contactId", asyncWrapper(getContactByIdContoller));
router.post("/", postValidation, asyncWrapper(addNewContactController));
router.delete("/:contactId", asyncWrapper(deleteContactController));
router.put(
  "/:contactId",
  postValidation,
  asyncWrapper(updateContactByIdContoller)
);
router.patch(
  "/:contactId/favorite",
  patchPostValidation,
  asyncWrapper(updateStatusContactController)
);

module.exports = {
  contactsRouter: router,
};
