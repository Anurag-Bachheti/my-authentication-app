import Joi from "joi";

// First-time signup validation (User / Employee)

export const signupSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(30)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(3)
        .required(),

    role: Joi.string()
        .valid("user", "employee")
        .required(),
});
