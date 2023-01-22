import { ModeloModel } from "../models/modelos.js";

export const getAllModelos = async (req, res) => {
  const modelo = await ModeloModel.findAll();
  return res.send({ modelo });
};

export const newModelo = async (req, res) => {
  const newModelo = {
    modelo: req.body.modelo,
  };
  await ModeloModel.create(newModelo);
  return res.send(newModelo);
};

export const updateModelo = async (req, res) => {
  const idModelo = req.params.idModelo;
  const modeloUpdated = {
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
  if (modelo !== null) {
    modelo.destroy();
    return res.send("Modelo com id:" + idModelo + " foi eliminado");
  } else {
    return res.send("Nao existe Modelo com id:" + idModelo);
  }
};
