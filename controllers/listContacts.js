const contacts = require("../models");

const listContacts = async (_, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

module.exports = listContacts;

// const books = require("../../models/books");

// const getAll = async (_, res) => {
//   const result = await books.getAll();
//   res.json(result);
// };

// module.exports = getAll;
