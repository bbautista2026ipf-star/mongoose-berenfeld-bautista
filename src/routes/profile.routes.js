// Router
import { Router } from "express";
// Controladores
import {
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/profile.controllers.js";
// Validaciones
import {
  profileIdValidations,
  createProfileValidations,
  updatedProfileValidations,
} from "../middlewares/validations/profile.validations.js";
// validate
import { validate } from "../middlewares/validate.middleware.js";

// crear router
const router = Router();

// Rutas
router.get("/", getAllProfiles);
router.get("/:id", profileIdValidations, validate, getProfileById);
router.post("/", createProfileValidations, validate, createProfile);
router.put(
  "/:id",
  profileIdValidations,
  updatedProfileValidations,
  validate,
  updateProfile,
);
router.delete("/:id", profileIdValidations, validate, deleteProfile);

// export router
export default router;
