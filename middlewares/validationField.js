const { validationResult } = require("express-validator");

const validationField = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.status(400).json({
      ok: true,
      error: error.mapped(),
    });
    return;
  }
  next();
};

module.exports = {
  validationField,
};
