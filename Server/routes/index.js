import Router from "express";
import {
  getAllUsers,
  getUsersById,
  newUser,
  updateUser,
} from "../controllers/user.js";
import {
  getAllcars,
  getCarsByUser,
  newCar,
  updateCar,
} from "../controllers/car.js";
import {
  getAllIntervencao,
  getAllIntervencaoByCar,
  newIntervencao,
  updateIntervencao,
} from "../controllers/intervencao.js";
const routes = Router();

routes.get("/users", getAllUsers);
routes.get("/user/:idUser", getUsersById);
routes.get("/newCar", newUser);
routes.get("/updateCar", updateUser);

routes.get("/cars", getAllcars);
routes.get("/cars", getAllcars);
routes.get("/cars", getAllcars);
routes.get("/cars", getAllcars);

routes.get("/intervencao", getAllIntervencao);
routes.get("/intervencao", getAllIntervencao);
routes.get("/intervencao", getAllIntervencao);
routes.get("/intervencao", getAllIntervencao);

export { routes };
