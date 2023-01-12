import { CarsModel } from "../models/cars.js";

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
    nome: req.body.nome,
    marca: req.body.marca,
    kilometragem: req.body.kilometragem,
  };
  const car = await CarsModel.findByPk(idCarro);
  if (car !== null) {
    car.update(carUpdated);
    return res.redirect(); //----------POR REDIRECT----------
  } else {
    return res.send("Nao existe carro com id:" + idCarro);
  }
};
