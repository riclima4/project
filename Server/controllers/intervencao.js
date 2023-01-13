import { IntervencaoModel } from "../models/intervencao.js";

export const getAllIntervencao = async (req, res) => {
  const idUser = req.params.idUser;
  const intervencao = await IntervencaoModel.findAll({
    where: { idUser: idUser },
  });
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
    idUser: req.body.idUser,
    idCarro: req.body.idCarro,
  };
  await IntervencaoModel.create(newIntervencao);
  return res.send(newIntervencao);
};

export const updateIntervencao = async (req, res) => {
  const idIntervencao = req.params.idIntervencao;
  const intervencaoUpdated = {
    nome: req.body.nome,
    description: req.body.description,
    data: req.body.data,
    kilometragem: req.body.kilometragem,
  };
  const intervencao = await IntervencaoModel.findByPk(idIntervencao);
  if (intervencao !== null) {
    intervencao.update(intervencaoUpdated);
    return res.send({ intervencaoUpdated }); //----------POR REDIRECT----------
  } else {
    return res.send("Nao existe Intervencao com id:" + idIntervencao);
  }
};
