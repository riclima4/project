import { InterventionTypeModel } from "../models/interventionType.js";

export const getAllInterventionType = async (req, res) => {
  const interventionType = await InterventionTypeModel.findAll();
  return res.send({ interventionType });
};
