const Joi = require("joi");
const { ValidationError, MissingFieldError } = require("../helpers/errors");

module.exports = {
  postValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
      favorite: Joi.boolean(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      next(new ValidationError(validationResult.error.details[0].message));
    }
    next();
  },

  patchPostValidation: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.boolean().required(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      next(new MissingFieldError("Missing field favorite"));
    }
    next();
  },
};
