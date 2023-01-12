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
    idCarro: req.body.idCarro,
    idUser: req.body.idUser,
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
    idCarro: req.body.idCarro,
    idUser: req.body.idUser,
    data: req.body.data,
    kilometragem: req.body.kilometragem,
  };
  const Intervencao = await IntervencaoModel.findByPk(idIntervencao);
  if (Intervencao !== null) {
    Intervencao.update(intervencaoUpdated);
    return res.redirect(); //----------POR REDIRECT----------
  } else {
    return res.send("Nao existe Intervencao com id:" + idIntervencao);
  }
};

export const deleteIntervencao = async (req, res) => {
  const idIntervencao = req.params.idIntervencao;
  const intervencao = await IntervencaoModel.findByPk(idIntervencao);
  if (intervencao !== null) {
    intervencao.destroy({ where: { idIntervencao: idIntervencao } });
    res.send("Intervencao Removida com sucesso");
  } else {
    return res.send("Não existe uma Intervencao com id:" + idIntervencao);
  }
};
