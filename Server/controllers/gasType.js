import { GastTypeModel } from "../models/gasType.js";

export const getAllGasType = async (req, res) => {
  const gasType = await GastTypeModel.findAll();
  return res.send({ gasType });
};

export const newGasType = async (req, res) => {
  const newGasType = {
    gasType: req.body.gasType,
  };
  await GastTypeModel.create(newGasType);
  return res.send(newGasType);
};

export const updateGasType = async (req, res) => {
  const idGasType = req.params.idGasType;
  const gasTypeUpdated = {
    gasType: req.body.gasType,
  };

  const gasType = await GastTypeModel.findByPk(idGasType);
  if (gasType !== null) {
    gasType.update(gasTypeUpdated);
    return res.send({ gasTypeUpdated });
  } else {
    return res.send("Nao existe Tipo de Combustivel com id:" + idGasType);
  }
};

export const deleteGasType = async (req, res) => {
  const idGasType = req.params.idGasType;
  const gasType = await GastTypeModel.findByPk(idGasType);
  if (gasType !== null) {
    gasType.destroy();
    return res.send(
      "Tipo de Combustivel com id:" + idGasType + " foi eliminado"
    );
  } else {
    return res.send("Nao existe Tipo de Combustivel com id:" + idGasType);
  }
};
