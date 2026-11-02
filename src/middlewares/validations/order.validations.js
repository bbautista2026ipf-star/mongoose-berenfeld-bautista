import { param, body } from "express-validator";
import { OrderModel } from "../../models/order.model.js";
import { ProductModel } from "../../models/product.model.js";
import { CustomerModel } from "../../models/customers.model.js";

export const orderIdValidations = [
  param("id").isMongoId().withMessage("el id no es valido"),
];

export const customerExists = async (customerId) => {
  const customer = await CustomerModel.exists({ _id: customerId });
  if (!customer) throw new Error("El cliente no existe");
  return true;
};

export const productsExists = async (productIds) => {
  const count = await ProductModel.countDocuments({ _id: { $in: productIds } });
  if (count !== productIds.length) throw new Error("Algun producto no existe");
  return true;
};

export const orderExists = async (orderId) => {
  const order = await OrderModel.exists({ _id: orderId });
  if (!order) throw new Error("el pedido no existe");
  return true;
};

export const productCanBeLinked = async (productId, { req }) => {
  const product = await ProductModel.exists({ _id: productId });
  if (!product) throw new Error("el producto no existe");

  const linked = await OrderModel.exists({
    _id: req.params.orderId,
    products: productId,
  });
  if (linked) throw new Error("el producto ya esta en el pedido");
  return true;
};

export const createOrderValidations = [
  body("customer")
    .isMongoId()
    .withMessage("el id del cliente no es valido")
    .custom(customerExists),
  body("products")
    .isArray({ min: 1 })
    .withMessage("products debe ser un array con al menos un producto")
    .bail()
    .custom(productsExists),
  body("products.*")
    .isMongoId()
    .withMessage("cada id de producto no es valido"),
  body("status")
    .optional()
    .notEmpty()
    .withMessage("este campo no debe quedar vacio")
    .isIn(["pending", "paid", "cancelled"])
    .withMessage("el estado debe ser paid, pending o cancelled"),
  body("order_date")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("este campo no debe quedar vacio")
    .isISO8601()
    .withMessage("la fecha no es valida"),
];

export const updateOrderValidations = [
  body("customer")
    .optional()
    .isMongoId()
    .withMessage("el id del cliente no es valido")
    .custom(customerExists),

  body("products")
    .optional()
    .isArray({ min: 1 })
    .withMessage("products debe ser un array con al menos un producto")
    .bail()
    .custom(productsExists),
  body("products.*")
    .optional()
    .isMongoId()
    .withMessage("cada id de producto no es valido"),

  body("status")
    .optional()
    .notEmpty()
    .withMessage("este campo no debe quedar vacio")
    .isIn(["pending", "paid", "cancelled"])
    .withMessage("el estado debe ser paid, pending o cancelled"),

  body("order_date")
    .optional()
    .trim()
    .isISO8601()
    .withMessage("la fecha no es valida"),
];

export const orderProductValidations = [
  param("orderId").isMongoId().withMessage("el id del pedido no es valido"),
  param("productId").isMongoId().withMessage("el id del producto no es valido"),
  param("orderId").custom(orderExists),
  param("productId").custom(productCanBeLinked),
];
