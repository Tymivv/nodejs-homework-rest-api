const Joi = require("joi");

const addValidation = (req, res, next) => {
  const addSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(6).max(15).required(),
  });
  const { error } = addSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  next();
};

const updateValidation = (req, res, next) => {
  const updateSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    phone: Joi.string().min(6).max(12),
  });
  const { error } = updateSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  next();
};

module.exports = {
  addValidation,
  updateValidation,
};
