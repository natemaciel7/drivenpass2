import Joi from "joi";

export const updateCredentialSchema = Joi.object({
  title: Joi.string().required(),
  url: Joi.string().uri().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
});
