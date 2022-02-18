const express = require("express");
const { customAlphabet } = require("nanoid");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

const router = express.Router();
const {
  addValidation,
  updateValidation,
} = require("../../middlewares/validation");
const nanoid = customAlphabet("0123456789", 2);

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  if (!contacts) {
    return res.status(400).json({ message: "contacts not found" });
  }
  res.status(200).json(JSON.parse(contacts));
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact.length === 0) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact);
});

router.delete("/:contactId", async (req, res, next) => {
  (await removeContact(req.params.contactId).find(
    (contact) => contact.id === req.params.contactId
  ))
    ? res.status(200).json({ message: "contact deleted" })
    : res.status(404).json({ message: "Not found" });
});

router.post("/", addValidation, async (req, res, next) => {
  const { name, email, phone } = req.body;
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  await addContact(newContact);
  res.status(201).json(newContact);
});

router.put("/:contactId", updateValidation, async (req, res, next) => {
  const { name, email, phone } = req?.body;
  const updContact = {
    name,
    email,
    phone,
  };
  const updatedContact = await updateContact(req.params.contactId, updContact);
  if (updatedContact) {
    res.status(200).json(updatedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
