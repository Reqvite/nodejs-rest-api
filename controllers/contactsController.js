const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../service/contactsService");

const getContactsController = async (req, res) => {
  const contacts = await listContacts();
  res.json({ contacts, status: "succes" });
};

const getContactByIdContoller = async (req, res) => {
  const contact = await getContactById(req.params.contactId);
  res.json({ contact, status: "succes" });
};

const addNewContactController = async (req, res) => {
  console.log(req.body);
  const { name, email, phone, favorite } = req.body;
  await addContact(name, email, phone, favorite);
  res.json({ status: "succes" });
};

const deleteContactController = async (req, res, next) => {
  await removeContact(req.params.contactId);
  res.json({ status: `Сontact deleted` });
};

const updateContactByIdContoller = async (req, res, next) => {
  await updateContact(req.params.contactId, req.body);
  res.json({ status: `succes` });
};

const updateStatusContactController = async (req, res, next) => {
  const contact = await updateStatusContact(req.params.contactId, req.body);
  res.json({ contact, status: `succes` });
};

module.exports = {
  getContactsController,
  getContactByIdContoller,
  addNewContactController,
  deleteContactController,
  updateContactByIdContoller,
  updateStatusContactController,
};
