const { Сontact } = require("../models/contact");

const listContacts = async (_, res) => {
  const result = await Сontact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

module.exports = listContacts;
