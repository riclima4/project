import { UserModel } from "../models/users.js";

export const getAllUsers = async (req, res) => {
  const users = await UserModel.findAll();
  return res.send({ users });
};

export const getUsersById = async (req, res) => {
  const idUser = req.params.idUser;
  const user = await UserModel.findByPk(idUser);
  if (user === null) {
    res.send("Não existe User com Id: " + idUser);
  }
  res.send({ user });
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
    return res.redirect(); //----------POR REDIRECT----------
  } else {
    return res.send("Não existe User com id: " + idUser);
  }
};

//---------ESPERAR PARA FAZER DELETE POR CAUSA DOS DELETES DE INTERVENÇOES E CARROS AO APAGAR CONTA--------------------------------------

// export const deleteUsers = async (req, res) => {
//   const NIF = req.params.NIF;
//   const user = await UserModel.findByPk(NIF);
//   if (user !== null) {
//     user.destroy({ where: { NIF: NIF } });
//     return res.send("User  Deleted");
//   } else {
//     return res.send("Não existe User com NIF: " + NIF);
//   }
// };

export const login = async (req, res) => {
  const { email, password } = req.body;

  const userWithEmail = await UserModel.findOne({ where: { email, password } });

  if (!userWithEmail)
    return res.status(400).json({ message: "Email or password errados" });

  const { password: OhYouDontNeedThis, ...user } = userWithEmail.dataValues;

  const token = createToken(user);
  res.json({ token });
};
