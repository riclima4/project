import { YearModel } from "../models/anos.js";

export const getAllyears = async (req, res) => {
  const years = await YearModel.findAll();
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
    year.destroy();
    return res.send("Ano com id:" + idYear + " foi eliminado");
  } else {
    return res.send("Nao existe Ano com id:" + idYear);
  }
};
