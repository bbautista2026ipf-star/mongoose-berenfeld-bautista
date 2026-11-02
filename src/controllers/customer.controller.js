import { matchedData } from "express-validator";
import { CustomerModel } from "../models/customers.model.js";
import { OrderModel } from "../models/order.model.js";
import { ProfileModel } from "../models/profile.model.js";

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await CustomerModel.find({ deleted_at: null });
    return res.status(200).json(customers);
  } catch (error) {
    return res.status(500).json({ message: "error al obtener los clientes" });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const customer = await CustomerModel.findOne({ _id: id, deleted_at: null });
    if (!customer) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    return res.status(200).json(customer);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el cliente" });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const customerData = matchedData(req);
    const customer = await CustomerModel.create(customerData);
    return res.status(201).json(customer);
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el cliente" });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const { id, ...customerData } = matchedData(req);
    const customer = await CustomerModel.findOneAndUpdate(
      {
        _id: id,
        deleted_at: null,
      },
      customerData,
      { returnDocument: "after" },
    );
    if (!customer) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    return res.status(200).json(customer);
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el cliente" });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const deletedAt = new Date();
    const customer = await CustomerModel.findOneAndUpdate(
      { _id: id, deleted_at: null },
      { deleted_at: deletedAt },
      { returnDocument: "after" },
    );
    if (!customer) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    await ProfileModel.updateMany(
      { customer: id, deleted_at: null },
      { deleted_at: deletedAt },
    );
    await OrderModel.updateMany(
      { customer: id, deleted_at: null },
      { deleted_at: deletedAt },
    );
    return res.status(200).json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar al cliente" });
  }
};
