import Router from "express";
import {
  deleteUser,
  getAllUsers,
  getUserid,
  newUser,
  updateUser,
} from "../controllers/user.js";
import {
  deleteCar,
  getAllcars,
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
const routes = Router();

routes.get("/users", getAllUsers);
routes.get("/user/:idUser", getUserid);
routes.post("/newUser", newUser);
routes.post("/updateUser/:idUser", updateUser);
routes.delete("/removeUser/:idUser", deleteUser);

routes.get("/cars", getAllcars);
routes.get("/car/:idUser", getCarsByUser);
routes.post("/newCar", newCar);
routes.post("/updateCar/:idCarro", updateCar);
routes.delete("/removeCar/:idCarro", deleteCar);

routes.get("/intervencoes/:idUser", getAllIntervencao);
routes.get("/intervencao/:idCarro", getAllIntervencaoByCar);
routes.post("/newIntervencao", newIntervencao);
routes.post("/updateIntervencao/:idIntervencao", updateIntervencao);
routes.delete("/removeIntervencao/:idIntervencao", deleteIntervencao);

export { routes };
