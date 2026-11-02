import { Router } from "express";
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller.js";
import {
  customerIdValidations,
  createCustomerValidations,
  updatedCustomerValidations,
} from "../middlewares/validations/customers.validations.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", getAllCustomers);
router.get("/:id", customerIdValidations, validate, getCustomerById);
router.post("/", createCustomerValidations, validate, createCustomer);
router.put(
  "/:id",
  customerIdValidations,
  updatedCustomerValidations,
  validate,
  updateCustomer,
);
router.delete("/:id", customerIdValidations, validate, deleteCustomer);

export default router;
