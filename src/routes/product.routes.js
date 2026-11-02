import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controllers.js";
import {
  productIdValidations,
  createProductValidations,
  updatedProductValidations,
} from "../middlewares/validations/product.validations.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", productIdValidations, validate, getProductById);
router.post("/", createProductValidations, validate, createProduct);
router.put(
  "/:id",
  updatedProductValidations,
  productIdValidations,
  validate,
  updateProduct,
);
router.delete("/:id", productIdValidations, validate, deleteProduct);

export default router;
