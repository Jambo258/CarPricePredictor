import { validationResult, body } from "express-validator";

const predictValidator = () => {
  return [
    body("kilometer")
      .notEmpty()
      .withMessage("kilometer value cant be empty")
      .isInt()
      .withMessage("kilometer value must be integer"),
    body("make")
      .notEmpty()
      .withMessage("make value cant be empty")
      .isString()
      .withMessage("make value must be string"),
    body("model")
      .notEmpty()
      .withMessage("model value cant be empty")
      .isString()
      .withMessage("model value must be string"),
    body("fuel")
      .notEmpty()
      .withMessage("fuel value cant be empty")
      .isString()
      .withMessage("fuel value must be string")
      .isIn([
        "Diesel",
        "Gasoline",
        "Electric",
        "Electric/Gasoline",
        "Electric/Diesel",
        "Hydrogen",
        "Ethanol",
      ]).withMessage(`fuel value must be "Diesel",
        "Gasoline",
        "Electric",
        "Electric/Gasoline",
        "Electric/Diesel",
        "Hydrogen",
        "Ethanol"`),
    body("gear")
      .notEmpty()
      .withMessage("gear value cant be empty")
      .isString()
      .withMessage("gear value must be string")
      .isIn(["Manual", "Automatic", "Semi-automatic"])
      .withMessage("gear must be either Manual, Semi-automatic or Automatic"),
    body("offerType")
      .notEmpty()
      .withMessage("offerType value cant be empty")
      .isString()
      .withMessage("offerType value must be string")
      .isIn([
        "Used",
        "New",
      ]).withMessage("offerType must be Used or New"),
    body("hp")
      .notEmpty()
      .withMessage("hp value cant be empty")
      .isFloat()
      .withMessage("hp value must be float"),
    body("year")
      .notEmpty()
      .withMessage("year value cant be empty")
      .isInt()
      .withMessage("year value must be integer"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      return res.status(400).json({ errors: errors.errors });
    },
  ];
};

export default predictValidator;
