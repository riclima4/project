import Sequelize from "sequelize";
import { dbInstance } from "../config/db.js";

const ModeloModel = dbInstance.define("modelo", {
  idModelo: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  modelo: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
});

export { ModeloModel };
