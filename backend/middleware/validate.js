export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errors = {};
    error.details.forEach(d => {
      errors[d.path[0]] = d.message;
    });

    return res.status(400).json({
      message: "Validation error",
      errors,
    });
  }

  req.body = value;
  next();
};