const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(6).max(15).required(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
    // res.status(500).json({
    //     message: "Server error"
    // })
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw RequestError(404, "Not found");
      // const error = new Error("Not found");
      // error.status = 404;
      // throw error;
      // return res.status(404).json({
      //     message: "Not found"
      // })
    }
    res.json(result);
  } catch (error) {
    next(error);
    // const {status = 500, message = "Server error"} = error;
    // res.status(status).json({
    //     message,
    // })
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const { id } = req.params;
    const result = await contacts.updateContactById(id, req.body);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContactById(id);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    // res.status(204).send()
    // res.json({
    //     message: "Delete success"
    // })
    // res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

// const express = require("express");
// const { customAlphabet } = require("nanoid");
// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// } = require("../../models/contacts.js");

// const router = express.Router();
// const {
//   addValidation,
//   updateValidation,
// } = require("../../middlewares/validation");
// const nanoid = customAlphabet("0123456789", 2);

// router.get("/", async (req, res, next) => {
//   const contacts = await listContacts();
//   if (!contacts) {
//     return res.status(400).json({ message: "contacts not found" });
//   }
//   res.json(JSON.parse(contacts));
// });

// router.get("/:contactId", async (req, res, next) => {
//   const { contactId } = req.params;
//   const contact = await getContactById(contactId);
//   if (contact.length === 0) {
//     return res.status(404).json({ message: "Not found" });
//   }
//   res.status(200).json(contact);
// });

// router.delete("/:contactId", async (req, res, next) => {
//   const a = await removeContact(req.params.contactId);
//   a.find((contact) => contact.id === req.params.contactId)
//     ? res.status(200).json({ message: "contact deleted" })
//     : res.status(404).json({ message: "Not found" });
//   // if (contact.length === 0) {
//   //   return res.status(404).json({ message: "Not found" });
//   // }
//   // res.status(200).json(contact);
// });

// router.post("/", addValidation, async (req, res, next) => {
//   const { name, email, phone } = req.body;
//   const newContact = {
//     id: nanoid(),
//     name,
//     email,
//     phone,
//   };
//   await addContact(newContact);
//   res.status(201).json(newContact);
// });

// router.put("/:contactId", updateValidation, async (req, res, next) => {
//   const { name, email, phone } = req?.body;
//   const updContact = {
//     name,
//     email,
//     phone,
//   };
//   const updatedContact = await updateContact(req.params.contactId, updContact);
//   if (updatedContact) {
//     res.status(200).json(updatedContact);
//   } else {
//     res.status(404).json({ message: "Not found" });
//   }
// });

// module.exports = router;
