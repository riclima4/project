import { GastTypeModel } from "../models/gasType.js";

export const getAllGasType = async (req, res) => {
  const gasType = await GastTypeModel.findAll();
  return res.send({ gasType });
};
