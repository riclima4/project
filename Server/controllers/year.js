import { YearModel } from "../models/anos.js";

export const getAllyears = async (req, res) => {
  const years = await YearModel.findAll();
  return res.send({ years });
};
