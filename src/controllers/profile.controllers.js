import { matchedData } from "express-validator";
import { ProfileModel } from "../../src/models/profile.model.js";

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await ProfileModel.find({ deleted_at: null }).populate(
      "customer",
    );
    return res.status(200).json(profiles);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener los perfiles" });
  }
};

export const getProfileById = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const profile = await ProfileModel.findOne({
      _id: id,
      deleted_at: null,
    }).populate("customer");
    if (!profile) {
      return res.status(404).json({ message: "perfil no encontrado" });
    }
    return res.status(200).json(profile);
  } catch (error) {
    return res.status(500).json({ message: "error al obtener el perfil" });
  }
};

export const createProfile = async (req, res) => {
  try {
    const profileData = matchedData(req);
    const profile = await ProfileModel.create(profileData);
    return res.status(201).json(profile);
  } catch (error) {
    return res.status(500).json({ message: "Error al crear el perfil" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id, ...profileData } = matchedData(req);
    const profile = await ProfileModel.findOneAndUpdate(
      {
        _id: id,
        deleted_at: null,
      },
      profileData,
      { returnDocument: "after" },
    ).populate("customer");
    if (!profile) {
      return res.status(404).json({ message: "Perfil no encontrado" });
    }
    return res.status(200).json(profile);
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar el perfil" });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const profile = await .
  } catch {

  }
};
