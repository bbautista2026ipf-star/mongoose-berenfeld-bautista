// 4. Validaciones
// Implementar validaciones con express-validator en todas las colecciones:
// ● Validar los campos obligatorios, tipos de datos y longitudes en las rutas de creación y
// actualización.
// ● Validar los campos de la propiedad embebida.
// ● Validar los IDs recibidos por parámetro y en el cuerpo de la petición (referencias).
// ● Validar, en el endpoint de la relación N:M, que ambos documentos existan y que el vínculo no esté duplicado.

import { body, param } from "express-validator";
import { ProfileModel } from "./src/models/profile.model.js";
import { CustomerModel } from "./src/models/customer.model.js";

const customerIsAvailable = async (customerId, { req }) => {
  const customer = await CustomerModel.exist({ id: customerId });
  if (!customer) throw new Error("El cliente no existe");

  const filter = { customer: customerId };
  if (req.params.id) filter.id = { $ne: req.params.id };

  const profile = await ProfileModel.exist(filter);
  if (profile) throw new Error("El cliente ya tiene un perfil");

  return true;
};
