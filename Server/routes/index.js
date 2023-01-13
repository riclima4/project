import Router from "express";
import {
  getAllUsers,
  getUserid,
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
routes.get("/user/:idUser", getUserid);
routes.post("/newUser", newUser);
routes.post("/updateUser/:idUser", updateUser);

routes.get("/cars", getAllcars);
routes.get("/car/:idUser", getCarsByUser);
routes.post("/newCar", newCar);
routes.put("/updateCar/:idCarro", updateCar);

routes.get("/intervencoes/:idUser", getAllIntervencao);
routes.get("/intervencao/:idCarro", getAllIntervencaoByCar);
routes.post("/newIntervencao", newIntervencao);
routes.put("/updateIntervencao/:idIntervencao", updateIntervencao);

export { routes };
