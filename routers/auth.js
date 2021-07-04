/* version larga */
// const express = require('express');
// const router= express.router
/* corta*/
const { Router } = require("express");
const { check } = require("express-validator");
const { newUser, login, renew } = require("../controllers/auth");
const { validationField } = require("../middlewares/validationField");
const { validToken } = require("../middlewares/validToken");
const router = Router();

router.post(
  "/new",
  [
    //middlewares valid
    check("name", "name is require")
      .notEmpty()
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),

    check("email", "Email invalid").isEmail(),

    check("password")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
    validationField,
  ],
  newUser
);
router.post(
  "/login",
  [
    check("email", "Email invalid").isEmail(),

    check("password")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
    validationField,
  ],
  login
);

router.get("/renew", validToken, renew);

module.exports = router;
