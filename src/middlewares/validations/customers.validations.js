import { body, param } from "express-validator";
import { CustomerModel } from "../../models/customers.model.js";

export const customerIdValidations = [
  param("id").isMongoId().withMessage("El id no es valido"),
];

export const emailIsAvailable = async (email) => {
  const existing = await CustomerModel.exists({ email });
  if (existing) throw new Error("el email ya esta registrado");
  return true;
};

export const emailIsAvailableUpdate = async (email, { req }) => {
  const existing = await CustomerModel.exists({
    email,
    _id: { $ne: req.params.id },
  });
  if (existing) throw new Error("el email ya esta registrado");
  return true;
};

export const createCustomerValidations = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("este campo no debe quedar vacio")
    .isLength({ min: 2, max: 50 })
    .withMessage("el nombre debe tener entre 2 a 50 caracteres"),
  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("este campo no debe quedar vacio")
    .isLength({ min: 2, max: 50 })
    .withMessage("el apellido debe tener entre 2 a 50 caracteres"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("este campo no debe quedar vacio")
    .isEmail()
    .withMessage("El email no es válido")
    .custom(emailIsAvailable),
  body("phone_number")
    .trim()
    .notEmpty()
    .withMessage("este campo no debe quedar vacio")
    .matches(/^\+?[0-9\s-]{8,15}$/)
    .withMessage("El telefono no es valido"),
];

export const updatedCustomerValidations = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("este campo no debe quedar vacio")
    .isLength({ min: 2, max: 50 })
    .withMessage("el nombre debe tener entre 2 a 50 caracteres"),
  body("last_name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("este campo no debe quedar vacio")
    .isLength({ min: 2, max: 50 })
    .withMessage("el apellido debe tener entre 2 a 50 caracteres"),
  body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("este campo no debe quedar vacio")
    .isEmail()
    .withMessage("el email no es valido")
    .custom(emailIsAvailableUpdate),
  body("phone_number")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("este campo no debe quedar vacio")
    .matches(/^\+?[0-9\s-]{8,15}$/)
    .withMessage("El telefono no es valido"),
];
