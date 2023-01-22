import Sequelize from "sequelize";
import { dbInstance } from "../config/db.js";
import { CarsModel } from "./cars.js";

const YearModel = dbInstance.define("years", {
  idYear: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  year: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
});

export { YearModel };
