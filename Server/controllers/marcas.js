import { CarsModel } from "../models/cars.js";
import { MarcasModel } from "../models/marcas.js";
import { ModeloModel } from "../models/modelos.js";

export const getAllMarcas = async (req, res) => {
  const marca = await MarcasModel.findAll();
  return res.send({ marca });
};
export const getAllMarcasTable = async (req, res) => {
  const pageSize = req.query.results;
  const page = req.query.page;
  const marca = await MarcasModel.findAll({
    offset: parseInt(page) * pageSize,
    limit: parseInt(pageSize),
    subQuery: false,
  });
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
    const modelos = await ModeloModel.findAll({ where: { idMarca: idMarca } });
    if (modelos.length == 0) {
      const carros = await CarsModel.findAll({
        where: { marca: parseInt(idMarca) },
      });
      if (carros.length == 0) {
        marca.destroy();
        return res.send("Marca foi eliminada");
      } else {
        return res.send("401");
      }
    } else {
      return res.send("401");
    }
  } else {
    return res.send("401");
  }
};
