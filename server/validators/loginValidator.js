import { validationResult, body } from "express-validator";

const loginValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("email value cant be empty")
      .isEmail()
      .normalizeEmail()
      .withMessage("email must be in email form"),
    body("password")
      .notEmpty()
      .withMessage("password value cant be empty")
      .isString()
      .withMessage("password value must be string")
      .isLength({ min: 5 })
      .withMessage("password must be atleast 5 characters"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      return res.status(400).json({ errors: errors.errors });
    },
  ];
};

export default loginValidator;
