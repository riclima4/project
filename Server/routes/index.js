import Router from "express";
import {
  deleteUser,
  getAllUsers,
  getUserid,
  login,
  newUser,
  updateUser,
} from "../controllers/user.js";
import {
  deleteCar,
  getAllcars,
  getCarsById,
  getCarsByUser,
  newCar,
  updateCar,
} from "../controllers/car.js";
import {
  deleteIntervencao,
  getAllIntervencao,
  getAllIntervencaoByCar,
  newIntervencao,
  updateIntervencao,
} from "../controllers/intervencao.js";
import { authRequired } from "../utils/jwt.js";

const routes = Router();

routes.post("/auth", authRequired);

//Utilizadores
routes.get("/users", getAllUsers);
routes.get("/user/:idUser", getUserid);
routes.post("/newUser", newUser);
routes.post("/login", login);
// routes.get("/logout/:token", logout);
routes.post("/updateUser/:idUser", updateUser);
routes.delete("/removeUser/:idUser", deleteUser);

//Carro
routes.get("/cars", getAllcars);
routes.get("/car/:idUser", getCarsByUser);
routes.get("/carById/:idCarro", getCarsById);

routes.post("/newCar", newCar);
routes.put("/updateCar/:idCarro", updateCar);
routes.delete("/removeCar/:idCarro", deleteCar);

//Intervenções
routes.get("/intervencoes/:idUser", getAllIntervencao);
routes.get("/intervencao/:idCarro", getAllIntervencaoByCar);
routes.post("/newIntervencao", newIntervencao);
routes.delete("/deleteIntervencao/:idIntervencao", deleteIntervencao);
routes.put("/updateIntervencao/:idIntervencao", updateIntervencao);

export { routes };
