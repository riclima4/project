import { YearModel } from "../models/anos.js";
import { CarsModel } from "../models/cars.js";

export const getAllyears = async (req, res) => {
  const years = await YearModel.findAll();
  return res.send({ years });
};
export const getAllyearsTable = async (req, res) => {
  const pageSize = req.query.results;
  const page = req.query.page;
  const years = await YearModel.findAll({
    offset: parseInt(page) * pageSize,
    limit: parseInt(pageSize),
    subQuery: false,
  });
  return res.send({ years });
};

export const newYear = async (req, res) => {
  const newYear = {
    year: req.body.year,
  };
  await YearModel.create(newYear);
  return res.send(newYear);
};

export const updateYear = async (req, res) => {
  const idYear = req.params.idYear;
  const yearUpdated = {
    year: req.body.year,
  };

  const year = await YearModel.findByPk(idYear);
  if (year !== null) {
    year.update(yearUpdated);
    return res.send({ yearUpdated });
  } else {
    return res.send("Nao existe Ano com id:" + idYear);
  }
};

export const deleteYear = async (req, res) => {
  const idYear = req.params.idYear;
  const year = await YearModel.findByPk(idYear);
  if (year !== null) {
    const carros = await CarsModel.findAll({ where: { ano: idYear } });
    if (carros.length == 0) {
      year.destroy();
      return res.send("200");
    } else {
      return res.send("401");
    }
  } else {
    return res.send("401");
  }
};
