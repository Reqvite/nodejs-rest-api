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
};

const addContact = async (name, email, phone, favorite) => {
  const contact = new Contact({ name, email, phone, favorite });
  await contact.save();
};

const updateContact = async (contactId, { name, email, phone }) => {
  if (!mongoose.isValidObjectId(contactId)) {
    throw new WrongParametersError(`Id format is wrong`);
  }

  const contact = await Contact.findByIdAndUpdate(contactId, {
    $set: { name, email, phone },
  });

  if (!contact) {
    throw new WrongParametersError(`Not found`);
  }
};

const updateStatusContact = async (contactId, body) => {
  const contact = await Contact.findByIdAndUpdate(
    contactId,
    {
      favorite: body.favorite,
    },
    { new: true }
  );

  if (!contact) {
    throw new WrongParametersError(`Not found`);
  }
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
