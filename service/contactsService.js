const mongoose = require("mongoose");
const { Contact } = require("../models/contactModel");
const { WrongParametersError } = require("../helpers/errors");

const listContacts = async () => {
  return await Contact.find({});
};

const getContactById = async (contactId) => {
  if (!mongoose.isValidObjectId(contactId)) {
    throw new WrongParametersError(`Id format is wrong`);
  }

  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new WrongParametersError(`Not found`);
  }

  return contact;
};

const removeContact = async (contactId) => {
  if (!mongoose.isValidObjectId(contactId)) {
    throw new WrongParametersError(`Id format is wrong`);
  }
  const contact = await Contact.findByIdAndRemove(contactId);

  if (!contact) {
    throw new WrongParametersError(`Not found`);
  }

  return contact;
};

const addContact = async (name, email, phone) => {
  const contact = new Contact({ name, email, phone });
  await contact.save();
};

const updateContact = async (contactId, { name, email, phone }) => {
  await Contact.findByIdAndUpdate(contactId, {
    $set: { name, email, phone },
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
