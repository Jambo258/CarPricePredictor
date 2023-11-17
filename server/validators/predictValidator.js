import { validationResult, body } from "express-validator";

const predictValidator = () => {
  return [
    body("kilometer")
      .notEmpty()
      .withMessage("kilometer value cant be empty")
      .isInt({min: 0})
      .withMessage("kilometer value must be integer and min value 0"),
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
      .isIn(["Used", "New"])
      .withMessage("offerType must be Used or New"),
    body("hp")
      .notEmpty()
      .withMessage("hp value cant be empty")
      .isFloat({min:1})
      .withMessage("hp value must be float and min hp values is 1"),
    body("year")
      .notEmpty()
      .withMessage("year value cant be empty")
      .isInt({ min: 1900, max: 2023 })
      .withMessage("year value must be integer and min value is 1900 and max value is 2023"),
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
