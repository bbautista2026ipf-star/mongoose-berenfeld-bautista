import { param, body } from "express-validator";
import { ProductModel } from "../../models/product.model.js";

export const productIdValidations = [
  param("id").isMongoId().withMessage("El id no es valido"),
];
