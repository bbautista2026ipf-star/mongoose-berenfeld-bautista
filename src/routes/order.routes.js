import { Router } from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  addProductToOrder,
} from "../controllers/order.controllers.js";
import {
  orderIdValidations,
  createOrderValidations,
  updateOrderValidations,
  orderProductValidations,
} from "../middlewares/validations/order.validations.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", getAllOrders);
router.get("/:id", orderIdValidations, validate, getOrderById);
router.post("/", createOrderValidations, validate, createOrder);
router.put(
  "/:id",
  orderIdValidations,
  updateOrderValidations,
  validate,
  updateOrder,
);
router.delete("/:id", orderIdValidations, validate, deleteOrder);
router.post(
  "/:orderId/products/:productId",
  orderProductValidations,
  validate,
  addProductToOrder,
);

export default router;
