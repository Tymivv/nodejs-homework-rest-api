const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseSchemaError } = require("../helpers");

const isbnRegexp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: isbnRegexp,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      // required: true,
  }
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseSchemaError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFovirteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFovirteSchema,
};

const Сontact = model("contact", contactSchema);
// categories => category
// mice => mouse

module.exports = {
  Сontact,
  schemas,
};
