import { CarsModel } from "../models/cars.js";
import { IntervencaoModel } from "../models/intervencao.js";

export const getAllcars = async (req, res) => {
  const cars = await CarsModel.findAll();
  return res.send({ cars });
};

export const getCarsByUser = async (req, res) => {
  const idUser = req.params.idUser;
  const cars = await CarsModel.findAll({ where: { idUser: idUser } });
  return res.send({ cars });
};

export const newCar = async (req, res) => {
  const newCar = {
    idUser: req.body.idUser,
    nome: req.body.nome,
    marca: req.body.marca,
    kilometragem: req.body.kilometragem,
  };
  await CarsModel.create(newCar);
  res.send({ newCar });
};

export const updateCar = async (req, res) => {
  const idCarro = req.params.idCarro;
  const carUpdated = {
    idUser: req.body.idUser,
    nome: req.body.nome,
    marca: req.body.marca,
    kilometragem: req.body.kilometragem,
  };
  const car = await CarsModel.findByPk(idCarro);
  if (car !== null) {
    car.update(carUpdated);
    return res.send(carUpdated);
  } else {
    return res.send("Nao existe carro com id:" + idCarro);
  }
};

export const deleteCar = async (req, res) => {
  const idCarro = req.params.idCarro;
  const carro = await CarsModel.findByPk(idCarro);
  const intervencao = await IntervencaoModel.findAll({
    where: { idCarro: idCarro },
  });
  if (intervencao !== null) {
    intervencao.forEach((item) => {
      item.destroy({ where: { idCarro: idCarro } });
    });
  }
  if (carro !== null) {
    carro.destroy({ where: { idCarro: idCarro } });
    res.send("Carro Removido com sucesso");
  } else {
    res.send("Não existe uma Carro com id:" + idCarro);
  }
};
