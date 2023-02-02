import { IntervencaoModel } from "../models/intervencao.js";

export const getAllIntervencoes = async (req, res) => {
  const idUser = req.params.idUser;
  const intervencao = await IntervencaoModel.findAll({
    include: [{ association: "carro" }, { association: "intType" }],
  });
  return res.send({ intervencao });
};
export const getAllIntervencoesByType = async (req, res) => {
  const idType = req.params.idType;
  const intervencao = await IntervencaoModel.findAll({
    where: { type: idType },
    include: [{ association: "carro" }, { association: "intType" }],
  });
  return res.send({ intervencao });
};
export const getAllIntervencaoByUser = async (req, res) => {
  const idUser = req.params.idUser;
  const intervencao = await IntervencaoModel.findAll({
    where: { idUser: idUser },
    include: [{ association: "carro" }, { association: "intType" }],
    order: [
      ["idCarro", "DESC"],
      ["idIntervencao", "DESC"],
    ],
  });
  return res.send({ intervencao });
};
export const getAllIntervencaoByCar = async (req, res) => {
  const idCarro = req.params.idCarro;
  const intervencao = await IntervencaoModel.findAll({
    where: { idCarro: idCarro },
    include: [{ association: "carro" }, { association: "intType" }],
    order: [["idCarro", "ASC"]],
  });
  return res.send({ intervencao });
};
export const newIntervencao = async (req, res) => {
  const newIntervencao = {
    nome: req.body.nome,
    description: req.body.description,
    idCarro: req.body.idCarro,
    data: req.body.data,
    kilometragem: req.body.kilometragem,
    idUser: req.body.idUser,
    idCarro: req.body.idCarro,
    price: req.body.price,
    type: req.body.type,
  };
  await IntervencaoModel.create(newIntervencao);
  return res.send(newIntervencao);
};

export const updateIntervencao = async (req, res) => {
  const idIntervencao = req.params.idIntervencao;
  const intervencaoUpdated = {
    nome: req.body.nome,
    description: req.body.description,
    idCarro: req.body.idCarro,
    data: req.body.data,
    kilometragem: req.body.kilometragem,
    price: req.body.price,
    type: req.body.type,
  };

  const intervencao = await IntervencaoModel.findByPk(idIntervencao);
  if (intervencao !== null) {
    intervencao.update(intervencaoUpdated);
    return res.send({ intervencaoUpdated }); //----------POR REDIRECT----------
  } else {
    return res.send("Nao existe Intervencao com id:" + idIntervencao);
  }
};

export const deleteIntervencao = async (req, res) => {
  const idIntervencao = req.params.idIntervencao;
  const intervencao = await IntervencaoModel.findByPk(idIntervencao);
  if (intervencao !== null) {
    intervencao.destroy({ where: { idIntervencao: idIntervencao } });
    return res.send("Intervencao Removida com sucesso");
  } else {
    return res.send("Não existe uma Intervencao com id:" + idIntervencao);
  }
};
