const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContactById = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, name, email, phone };
  await updateContacts(contacts);
  return contacts[index];
};

const removeContactById = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContactById,
};

// const fs = require("fs/promises");
// const path = require("path");
// const contactsPath = path.resolve("./models/contacts.json");

// const listContacts = async () => {
//   try {
//     return await fs.readFile(contactsPath, "utf-8");
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// const getContactById = async (contactId) => {
//   try {
//     const newData = JSON.parse(await fs.readFile(contactsPath)).filter(
//       (contact) => contact.id === contactId
//     );
//     return newData;
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// const removeContact = async (contactId) => {
//   try {
//     const data = JSON.parse(await fs.readFile(contactsPath)).filter(
//       (contact) => contact.id !== contactId
//     );
//     await fs.writeFile(contactsPath, JSON.stringify(data));
//     return data;
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// const addContact = async (body) => {
//   try {
//     const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
//     data.push(body);
//     await fs.writeFile(contactsPath, JSON.stringify(data));
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// const updateContact = async (contactId, body) => {
//   try {
//     const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
//     const updateContactList = data.map((contact) => {
//       const {
//         name = contact.name,
//         email = contact.email,
//         phone = contact.phone,
//       } = body;
//       if (contact.id === contactId) {
//         return {
//           ...contact,
//           name,
//           email,
//           phone,
//         };
//       }
//       return contact;
//     });
//     const getContactById = updateContactList.find(
//       (contact) => contact.id === contactId
//     );
//     await fs.writeFile(contactsPath, JSON.stringify(updateContactList));

//     return getContactById;
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// };
