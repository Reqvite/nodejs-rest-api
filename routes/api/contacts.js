const express = require("express");
const router = express.Router();

const {
  addPostValidation,
  patchPostValidation,
} = require("../../middlewares/validationMiddleware");
const {
  getContactsController,
  getContactByIdContoller,
  addNewContactController,
  deleteContactController,
  updateContactByIdContoller,
} = require("../../controllers/contactsController");

const { asyncWrapper } = require("../../helpers/apiHelpers");

router.get("/", asyncWrapper(getContactsController));
router.get("/:contactId", asyncWrapper(getContactByIdContoller));
router.post("/", addPostValidation, asyncWrapper(addNewContactController));
router.delete("/:contactId", asyncWrapper(deleteContactController));
router.put(
  "/:contactId",
  patchPostValidation,
  asyncWrapper(updateContactByIdContoller)
);

module.exports = router;
