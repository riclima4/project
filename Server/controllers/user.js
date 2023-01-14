import { CarsModel } from "../models/cars.js";
import { IntervencaoModel } from "../models/intervencao.js";
import { UserModel } from "../models/users.js";
import { createToken } from "../utils/jwt.js";

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
  const newUser = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };
  const asd = await UserModel.create(newUser);
  const { password, ...user } = asd.dataValues;

  const token = createToken(user);

  res.send(token);
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
    return res.send(userUpdated); //----------POR REDIRECT----------
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

// export const deleteUsers = async (req, res) => {
//   const idUser = req.params.id;
//   const user = await UserModel.findByPk(idUser);
//   const cart = await CartModule.findAll({ where: { idUser: idUser } });
//   const userHistory = await HistoryModule.findAll({
//     where: { idUser: idUser },
//   });
//   if (cart !== null) {
//     cart.forEach((item) => {
//       item.destroy({ where: { idUser: idUser } });
//     });
//   }
//   if (userHistory !== null) {
//     userHistory.forEach((item) => {
//       item.destroy({ where: { idUser: idUser } });
//     });
//   }

//   setTimeout(() => {
//     if (user !== null) {
//       user.destroy({ where: { idUser: idUser } });
//       res.send("Funfa");
//     } else {
//       res.send("Não existe User com id: " + idUser);
//     }
//   }, 2000);
// };

export const login = async (req, res) => {
  const { email, password } = req.body;

  const userWithEmail = await UserModel.findOne({ where: { email, password } });

  if (!userWithEmail)
    return res.status(400).json({ message: "Email ou password errados" });

  const { password: OhYouDontNeedThis, ...user } = userWithEmail.dataValues;

  const token = createToken(user);
  res.json({ token });
};
