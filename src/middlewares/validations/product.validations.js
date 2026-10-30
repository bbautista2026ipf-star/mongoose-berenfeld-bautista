import { param, body } from "express-validator";
import { ProductModel } from "../../models/product.model.js";

export const productIdValidations = [
  param("id").isMongoId().withMessage("El id no es valido"),
];

export const nameIsAvailable = async (name) => {
  const existing = await ProductModel.exists({ name });
  if (existing) throw new Error("el producto ya existe");
  return true;
};

export const createProductValidations = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("este campo no debe quedar vacio")
    .isLength({ min: 2, max: 50 })
    .withMessage("Este campo debe tener entre 2 a 50 caracteres")
    .custom(nameIsAvailable),
  body("price")
    .trim()
    .notEmpty()
    .withMessage("este campo no debe quedar vacio")
    .isInt({ min: 1, max: 10 })
    .withMessage("Este campo debe tener entre 1 a 10 numeros"),
];

export const updatedProductValidations = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("este campo no debe quedar vacio")
    .isLength({ min: 2, max: 50 })
    .withMessage("Este campo debe tener entre 2 a 50 caracteres"),
  body("price")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("este campo no debe quedar vacio")
    .isInt({ min: 1, max: 10000000 })
    .withMessage("Este campo debe tener entre 1 a 10 numeros"),
];
