import { CarsModel } from "../models/cars.js";
import { IntervencaoModel } from "../models/intervencao.js";
import { UserModel } from "../models/users.js";
import { createToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
  const users = await UserModel.findAll();
  return res.send({ users });
};

export const getUserid = async (req, res) => {
  const idUser = req.params.idUser;
  const user = await UserModel.findByPk(idUser);
  if (user === null) {
    res.send("Não existe User com id: " + idUser);
  }
  res.send(user);
};
export const newUser = async (req, res) => {
  const passwordNormal = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  const hash = await bcrypt.hash(passwordNormal, salt);
  const newUser = {
    username: req.body.username,
    password: hash,
    email: req.body.email,
  };
  const findUser = await UserModel.findOne({ where: { email: newUser.email } });
  if (!findUser) {
    const asd = await UserModel.create(newUser);
    const { password, ...user } = asd.dataValues;

    const token = createToken(user);

    res.send(false);
  } else {
    res.send(true);
    return;
  }
};

export const updateUser = async (req, res) => {
  const idUser = req.params.idUser;
  const userUpdated = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    type: req.body.type,
  };
  const user = await UserModel.findByPk(idUser);
  if (user !== null) {
    user.update(userUpdated);
    return res.send(userUpdated);
  } else {
    return res.send("Não existe User com id: " + idUser);
  }
};

export const deleteUser = async (req, res) => {
  const idUser = req.params.idUser;
  const user = await UserModel.findByPk(idUser);
  const carro = await CarsModel.findAll({ where: { idUser: idUser } });
  const intervencao = await IntervencaoModel.findAll({
    where: { idUser: idUser },
  });
  if (intervencao !== null) {
    intervencao.forEach((item) => {
      item.destroy({ where: { idUser: idUser } });
    });
  }
  if (carro !== null) {
    carro.destroy({ where: { idUser: idUser } });
  }
  if (user !== null) {
    user.destroy({ where: { idUser: idUser } });
    res.send("Utilizador eliminado com sucesso");
  } else {
    res.send("Não existe User com id: " + idUser);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const userWithEmail = await UserModel.findOne({ where: { email: email } });

  if (!userWithEmail) {
    res.send("Utilizador não encontrado");
    return;
  }
  //  res.status(400).json({ message: "Email ou password errados" });
  const hashPass = userWithEmail.password;
  const isValid = await bcrypt.compare(password, hashPass);
  if (!isValid) {
    res.send(isValid);
    return;
  }
  const { password: noPassNeed, ...user } = userWithEmail.dataValues;

  const token = createToken(user);
  res.json(token);
};
