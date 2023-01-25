const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../service/contactsService");

const getContactsController = async (req, res) => {
  const { page, limit } = req.query;
  const contacts = await listContacts({ page, limit });
  res.json({ status: "succes", code: 200, contacts });
};

const getContactByIdContoller = async (req, res) => {
  const contact = await getContactById(req.params.contactId);
  res.json({ status: "succes", code: 200, contact });
};

const addNewContactController = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const contact = await addContact(name, email, phone, favorite);
  res.status(201).json({ status: "succes", code: 201, contact });
};

const deleteContactController = async (req, res, next) => {
  await removeContact(req.params.contactId);
  res.json({
    status: "success",
    code: 200,
    message: "Contact deleted",
  });
};

const updateContactByIdContoller = async (req, res, next) => {
  const contact = await updateContact(req.params.contactId, req.body);
  res.json({ status: "succes", code: 200, contact });
};

const updateStatusContactController = async (req, res, next) => {
  const contact = await updateStatusContact(req.params.contactId, req.body);
  res.json({ status: "succes", code: 200, contact });
};

module.exports = {
  getContactsController,
  getContactByIdContoller,
  addNewContactController,
  deleteContactController,
  updateContactByIdContoller,
  updateStatusContactController,
};
