const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../service/contactsService");

const getContacts = async (req, res) => {
  try {
    const contacts = await listContacts();
    console.log(contacts);
    res.json({ contacts, status: "succes" });
  } catch (err) {
    console.log(err);
  }
};

const getContact = async (req, res) => {
  const [contact] = await getContactById(req.params.contactId);
  if (!contact) {
    return res.status(404).json({ status: `Not found` });
  }
  res.json({ contact, status: "succes" });
};

const addNewContact = async (req, res) => {
  const { name, email, phone } = req.body;
  await addContact(name, email, phone);
  res.json({ status: "succes" });
};

const deleteContact = async (req, res, next) => {
  const status = await removeContact(req.params.contactId);
  if (!status) {
    return res.status(404).json({ status: `Not found` });
  }
  res.json({ status: `Сontact deleted` });
};

const updateContactById = async (req, res, next) => {
  const status = await updateContact(req.params.contactId, req.body);
  if (!status) {
    return res.status(404).json({ status: `Not found` });
  }
  res.json({ status: `succes` });
};

module.exports = {
  getContacts,
  getContact,
  addNewContact,
  deleteContact,
  updateContactById,
};
