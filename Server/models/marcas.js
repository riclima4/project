import Sequelize from "sequelize";
import { dbInstance } from "../config/db.js";

const MarcasModel = dbInstance.define("marcas", {
  idMarca: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  marca: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
});

export { MarcasModel };
