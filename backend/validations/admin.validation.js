import Joi from "joi";

// Admin create user
export const adminCreateUserSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("user", "employee").required(),
});

// Admin edit user
export const adminUpdateUserSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  role: Joi.string().valid("user", "employee").required(),
});
