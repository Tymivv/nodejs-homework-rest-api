const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  try {
    return await fs.readFile(contactsPath, "utf-8");
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const newData = JSON.parse(await fs.readFile(contactsPath)).filter(
      (contact) => contact.id === contactId
    );
    return newData;
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath)).filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(data));
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async (body) => {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    data.push(body);
    await fs.writeFile(contactsPath, JSON.stringify(data));
  } catch (err) {
    console.log(err.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
    const updateContactList = data.map((contact) => {
      const {
        name = contact.name,
        email = contact.email,
        phone = contact.phone,
      } = body;
      if (contact.id === contactId) {
        return {
          ...contact,
          name,
          email,
          phone,
        };
      }
      return contact;
    });
    const getContactById = updateContactList.find(
      (contact) => contact.id === contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(updateContactList));

    return getContactById;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
