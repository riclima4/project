import { CarsModel } from "../models/cars.js";
import { ModeloModel } from "../models/modelos.js";

export const getAllModelos = async (req, res) => {
  const modelo = await ModeloModel.findAll({
    include: [{ association: "marcaType" }],
  });
  return res.send({ modelo });
};
export const getAllModelosTable = async (req, res) => {
  const pageSize = req.query.results;
  const page = req.query.page;
  const modelo = await ModeloModel.findAll({
    include: [{ association: "marcaType" }],
    offset: parseInt(page) * pageSize,
    limit: parseInt(pageSize),
    subQuery: false,
  });
  return res.send({ modelo });
};
export const getModeloByMacra = async (req, res) => {
  const idMarca = req.params.idMarca;
  const modelo = await ModeloModel.findAll({ where: { idMarca: idMarca } });
  return res.send({ modelo });
};
export const getModeloByID = async (req, res) => {
  const idModelo = req.params.idModelo;
  const modelo = await ModeloModel.findAll({
    where: { idModelo: idModelo },
    include: [{ association: "marcaType" }],
  });
  return res.send({ modelo });
};

export const newModelo = async (req, res) => {
  const newModelo = {
    idMarca: req.body.marca,
    modelo: req.body.modelo,
  };
  await ModeloModel.create(newModelo);
  return res.send(newModelo);
};

export const updateModelo = async (req, res) => {
  const idModelo = req.params.idModelo;
  const modeloUpdated = {
    idMarca: req.body.idMarca,
    modelo: req.body.modelo,
  };

  const modelo = await ModeloModel.findByPk(idModelo);
  if (modelo !== null) {
    modelo.update(modeloUpdated);
    return res.send({ modeloUpdated });
  } else {
    return res.send("Nao existe Modelo com id:" + idModelo);
  }
};

export const deleteModelo = async (req, res) => {
  const idModelo = req.params.idModelo;
  const modelo = await ModeloModel.findByPk(idModelo);
  const carros = await CarsModel.findAll({ where: { modelo: idModelo } });
  if (modelo !== null) {
    if (carros.length == 0) {
      modelo.destroy();
      return res.send("Modelo com id:" + idModelo + " foi eliminado");
    } else {
      return res.send("401");
    }
  } else {
    return res.send("401");
  }
};
