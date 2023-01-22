import { MarcasModel } from "../models/marcas.js";

export const getAllMarcas = async (req, res) => {
  const marca = await MarcasModel.findAll();
  return res.send({ marca });
};

export const newMarca = async (req, res) => {
  const newMarca = {
    marca: req.body.marca,
  };
  await MarcasModel.create(newMarca);
  return res.send(newMarca);
};

export const updateMarca = async (req, res) => {
  const idMarca = req.params.idMarca;
  const marcaUpdated = {
    marca: req.body.marca,
  };

  const marca = await MarcasModel.findByPk(idMarca);
  if (marca !== null) {
    marca.update(marcaUpdated);
    return res.send({ marcaUpdated });
  } else {
    return res.send("Nao existe Marca com id:" + idMarca);
  }
};

export const deleteMarca = async (req, res) => {
  const idMarca = req.params.idMarca;
  const marca = await MarcasModel.findByPk(idMarca);
  if (marca !== null) {
    marca.destroy();
    return res.send("Marca com id:" + idMarca + " foi eliminada");
  } else {
    return res.send("Nao existe Marca com id:" + idMarca);
  }
};
