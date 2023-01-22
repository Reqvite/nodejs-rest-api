const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
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
  const { name, email, phone } = req.body;
  await addContact(name, email, phone);
  res.json({ status: "succes" });
};

const deleteContactController = async (req, res, next) => {
  const status = await removeContact(req.params.contactId);
  if (!status) {
    return res.status(404).json({ status: `Not found` });
  }
  res.json({ status: `Сontact deleted` });
};

const updateContactByIdContoller = async (req, res, next) => {
  await updateContact(req.params.contactId, req.body);
  // if (!status) {
  //   return res.status(404).json({ status: `Not found` });
  // }
  res.json({ status: `succes` });
};

module.exports = {
  getContactsController,
  getContactByIdContoller,
  addNewContactController,
  deleteContactController,
  updateContactByIdContoller,
};
