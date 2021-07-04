const { Router } = require("express");
const { check } = require("express-validator");

const { validationField } = require("../middlewares/validationField");
const { isDate } = require("../helpers/isDate");

const {
  getEvent,
  newEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const { validToken } = require("../middlewares/validToken");

const router = Router();

router.use(validToken);

router.get(
  "/",

  getEvent
);
router.post(
  "/",
  [
    //middlewares valid
    check("title", "title is require")
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("must be at least 2 chars long"),

    check("start", "date is require").custom(isDate),
    check("end", "date is require").custom(isDate),

    validationField,
  ],
  newEvent
);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
