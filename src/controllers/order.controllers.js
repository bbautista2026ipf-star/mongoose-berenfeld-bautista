import { matchedData } from "express-validator";
import { OrderModel } from "../models/order.model.js";

export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ deleted_at: null })
      .populate("customer")
      .populate("products");
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener las órdenes" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const order = await OrderModel.findOne({ _id: id, deleted_at: null })
      .populate("customer")
      .populate("products");
    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener la orden" });
  }
};

export const createOrder = async (req, res) => {
  try {
    const orderData = matchedData(req);
    const order = await OrderModel.create(orderData);
    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Error al crear la orden" });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id, ...orderData } = matchedData(req);
    const order = await OrderModel.findOneAndUpdate(
      { _id: id, deleted_at: null },
      orderData,
      { returnDocument: "after" },
    )
      .populate("customer")
      .populate("products");
    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar la orden" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const order = await OrderModel.findOneAndUpdate(
      { _id: id, deleted_at: null },
      { deleted_at: new Date() },
      { returnDocument: "after" },
    );
    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    return res.status(200).json({ message: "Orden eliminada correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar la orden" });
  }
};

export const addProductToOrder = async (req, res) => {
  try {
    const { orderId, productId } = matchedData(req);
    const order = await OrderModel.findOneAndUpdate(
      { _id: orderId, deleted_at: null },
      { $addToSet: { products: productId } },
      { returnDocument: "after" },
    )
      .populate("customer")
      .populate("products");
    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    return res
      .status(200)
      .json({ message: "Producto agregado a la orden", order });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al agregar el producto a la orden" });
  }
};
