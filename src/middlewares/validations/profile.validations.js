import { body, param } from "express-validator";
import { ProfileModel } from "../../models/profile.model.js";
import { CustomerModel } from "../../models/customers.model.js";

const customerIsAvailable = async (customerId, { req }) => {
  const customer = await CustomerModel.exists({ _id: customerId });
  if (!customer) throw new Error("El cliente no existe");

  const filter = { customer: customerId };
  if (req.params.id) filter._id = { $ne: req.params.id };

  const profile = await ProfileModel.exists(filter);
  if (profile) throw new Error("El cliente ya tiene un perfil");

  return true;
};

export const profileIdValidations = [
  param("id").isMongoId().withMessage("El id no es valido"),
];

export const createProfileValidations = [
  body("customer")
    .trim()
    .isMongoId()
    .withMessage("El id del cliente no es valido")
    .custom(customerIsAvailable),
  body("birth_date")
    .optional()
    .isISO8601()
    .withMessage("la fecha no es valida"),
  body("address.street")
    .trim()
    .notEmpty()
    .withMessage("Este campo es obligatorio")
    .isLength({ min: 2, max: 255 })
    .withMessage("La calle debe tener entre 2 y 255 caracteres"),
  body("address.street_number")
    .trim()
    .notEmpty()
    .withMessage("La altura es obligatoria")
    .isInt({ min: 0, max: 10000 })
    .withMessage("La altura debe rondar entre el 0 y 10000"),
  body("address.city")
    .trim()
    .notEmpty()
    .withMessage("Este campo es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("La ciudad debe tener entre 2 a 50 caracteres"),
  body("address.country")
    .trim()
    .notEmpty()
    .withMessage("el pais es obligatorio")
    .matches(/^[\p{L}\s]+$/u)
    .withMessage("el pais solo debe tener letras"),
];

export const updatedProfileValidations = [
  body("customer")
    .optional()
    .trim()
    .isMongoId()
    .withMessage("El id del cliente no es válido")
    .custom(customerIsAvailable),
  body("birth_date")
    .optional()
    .isISO8601()
    .withMessage("La fecha no es válida"),
  body("address.street")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La calle no puede estar vacía")
    .isLength({ min: 2, max: 255 })
    .withMessage("La calle debe tener entre 2 y 255 caracteres"),
  body("address.street_number")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La altura no puede estar vacía")
    .isInt({ min: 0, max: 10000 })
    .withMessage("La altura debe estar entre 0 y 10000"),
  body("address.city")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("La ciudad no puede estar vacía")
    .isLength({ min: 2, max: 50 })
    .withMessage("La ciudad debe tener entre 2 y 50 caracteres"),
  body("address.country")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El país no puede estar vacío")
    .matches(/^[\p{L}\s]+$/u)
    .withMessage("El país solo debe tener letras"),
];
