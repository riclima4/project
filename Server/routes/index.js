import Router from "express";
import {
  deleteUser,
  getAllUsers,
  getUserCount,
  getUserid,
  login,
  newUser,
  updateUser,
} from "../controllers/user.js";
import {
  deleteCar,
  getAllcars,
  getCarsById,
  getCarsByIdPrice,
  getCarsByUser,
  newCar,
  updateCar,
} from "../controllers/car.js";
import {
  deleteIntervencao,
  getAllIntervencaoByCar,
  getAllIntervencaoByUser,
  newIntervencao,
  updateIntervencao,
} from "../controllers/intervencao.js";
import { authRequired } from "../utils/jwt.js";
import {
  deleteGasType,
  getAllGasType,
  newGasType,
  updateGasType,
} from "../controllers/gasType.js";
import {
  deleteInterventionType,
  getAllInterventionType,
  getIntType,
  newInterventionType,
  updateInterventionType,
} from "../controllers/interventionType.js";
import {
  deleteYear,
  getAllyears,
  newYear,
  updateYear,
} from "../controllers/year.js";
import {
  deleteModelo,
  getAllModelos,
  getAllModelosTable,
  getModeloByID,
  getModeloByMacra,
  newModelo,
  updateModelo,
} from "../controllers/modelo.js";
import {
  deleteMarca,
  getAllMarcas,
  getAllMarcasTable,
  newMarca,
  updateMarca,
} from "../controllers/marcas.js";
const routes = Router();

routes.post("/auth", authRequired);

//Utilizadores
routes.get("/users", getAllUsers);
routes.get("/userCount", getUserCount);
routes.get("/user/:idUser", getUserid);
routes.post("/newUser", newUser);
routes.post("/login", login);
routes.put("/updateUser/:idUser", updateUser);
routes.delete("/removeUser/:idUser", deleteUser);

//Carro
routes.get("/cars", getAllcars);
routes.get("/car/:idUser", getCarsByUser);
routes.get("/carById/:idCarro", getCarsById);
routes.get("/carByIdPrice/:idCarro", getCarsByIdPrice);
routes.post("/newCar", newCar);
routes.put("/updateCar/:idCarro", updateCar);
routes.delete("/removeCar/:idCarro", deleteCar);

//Intervenções
routes.get("/intervencoes/:idUser", getAllIntervencaoByUser);
routes.get("/intervencao/:idCarro", getAllIntervencaoByCar);
routes.post("/newIntervencao", newIntervencao);
routes.delete("/deleteIntervencao/:idIntervencao", deleteIntervencao);
routes.put("/updateIntervencao/:idIntervencao", updateIntervencao);

//Tipo Combustivel
routes.get("/combustivel", getAllGasType);
routes.post("/newCombustivel", newGasType);
routes.put("/updateGasType/:idGasType", updateGasType);
routes.delete("/deleteGasType/:idGasType", deleteGasType);

//Tipo de Intervenção
routes.get("/interventionType", getAllInterventionType);
routes.get("/intType", getIntType);
routes.post("/newIntType", newInterventionType);
routes.put("/updateIntType/:idInterventionType", updateInterventionType);
routes.delete("/deleteIntType/:idInterventionType", deleteInterventionType);
//lista anos
routes.get("/years", getAllyears);
routes.post("/newYear", newYear);
routes.put("/updateYear/:idYear", updateYear);
routes.delete("/deleteYear/:idYear", deleteYear);
//Modelos
routes.get("/modelos", getAllModelos);
routes.get("/modelosTable", getAllModelosTable);
routes.get("/modelo/:idMarca", getModeloByMacra);
routes.get("/modeloByID/:idModelo", getModeloByID);
routes.post("/newModelo", newModelo);
routes.put("/updateModelo/:idModelo", updateModelo);
routes.delete("/deleteModelo/:idModelo", deleteModelo);

//marcas
routes.get("/marcas", getAllMarcas);
routes.get("/marcasTable", getAllMarcasTable);
routes.post("/newMarca", newMarca);
routes.put("/updateMarca/:idMarca", updateMarca);
routes.delete("/deleteMarca/:idMarca", deleteMarca);

export { routes };
