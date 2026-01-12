import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Enter a valid email",
    }),

  password: Joi.string()
    .min(3)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 3 characters",
    }),
});
