import Sequelize from "sequelize";
import { dbInstance } from "../config/db.js";

const GastTypeModel = dbInstance.define("gasType", {
  idGasType: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  gasType: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
});

export { GastTypeModel };
