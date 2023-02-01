import { CarsModel } from "../models/cars.js";
import { GastTypeModel } from "../models/gasType.js";

export const getAllGasType = async (req, res) => {
  const gasType = await GastTypeModel.findAll();
  return res.send({ gasType });
};
export const getAllGasTypeTable = async (req, res) => {
  const pageSize = req.query.results;
  const page = req.query.page;
  const gasType = await GastTypeModel.findAll({
    offset: parseInt(page) * pageSize,
    limit: parseInt(pageSize),
    subQuery: false,
  });
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
    const carros = await CarsModel.findAll({ where: { gas: idGasType } });
    if (carros.length == 0) {
      gasType.destroy();
      return res.send("200");
    } else {
      return res.send("401");
    }
  } else {
    return res.send("401");
  }
};
