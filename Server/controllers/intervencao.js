import { IntervencaoModel } from "../models/intervencao.js";

export const getAllIntervencao = async (req, res) => {
  const intervencao = await IntervencaoModel.findAll();
  return res.send({ intervencao });
};
export const getAllIntervencaoByCar = async (req, res) => {
  const idCar = req.params.idCar;
  const intervencao = await IntervencaoModel.findAll({
    where: { idCar: idCar },
  });
  return res.send(intervencao);
};

export const newIntervencao = async (req, res) => {
  const newIntervencao = {
    nome: req.body.nome,
    description: req.body.description,
    data: req.body.data,
    kilometragem: req.body.kilometragem,
  };
  await IntervencaoModel.create(newIntervencao);
};

export const updateIntervencao = async (req, res) => {
  const idIntervencao = req.params.idIntervencao;
  const intervencaoUpdated = {
    nome: req.body.nome,
    description: req.body.description,
    data: req.body.data,
    kilometragem: req.body.kilometragem,
  };
  const intervao = await intervencaoModel.findByPk(idIntervencao);
  if (intervao !== null) {
    intervao.update(intervencaoUpdated);
    return res.redirect(); //----------POR REDIRECT----------
  } else {
    return res.send("Nao existe Intervencao com id:" + idIntervencao);
  }
};
