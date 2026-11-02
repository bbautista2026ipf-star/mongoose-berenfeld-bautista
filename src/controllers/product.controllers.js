import { matchedData } from "express-validator";
import { OrderModel } from "../models/order.model.js";
import { ProductModel } from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los productos" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const product = await ProductModel.findOne({ _id: id });
    if (!products) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el producto" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const productData = matchedData(req);
    const product = await ProductModel.create(productData);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el producto" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id, ...productData } = matchedData(req);
    const product = await ProductModel.findOneAndUpdate(
      { _id: id },
      { ...productData },
      { returnDocument: "after" },
    );
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const product = await ProductModel.findOneAndDelete({ _id: id });
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    await OrderModel.updateMany({ products: id }, { $pull: { products: id } });
    return res
      .status(200)
      .json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: "Error al borrar el producto" });
  }
};
