import "dotenv/config";
import { validationResult, body } from "express-validator";

const updateValidator = () => {
  return [
    body("username")
      .optional()
      .notEmpty()
      .withMessage("username value cant be empty")
      .isString()
      .withMessage("username value must be string"),
    body("email")
      .optional()
      .notEmpty()
      .withMessage("email value cant be empty")
      .isEmail()
      .normalizeEmail()
      .withMessage("email must be in email form"),
    body("password")
      .optional()
      .notEmpty()
      .withMessage("password value cant be empty")
      .isString()
      .withMessage("password value must be string")
      .isLength({ min: 5 })
      .withMessage("password must be atleast 5 characters"),
    body("role")
      .optional()
      .notEmpty()
      .withMessage("role value cant be empty")
      .isString()
      .withMessage("role value must be string")
      .isIn([process.env.ADMIN_ROLE, process.env.ROLE])
      .withMessage("role must be either admin or user"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      return res.status(400).json({ errors: errors.errors });
    },
  ];
};

export default updateValidator;
