import Sequelize from "sequelize";
import { dbInstance } from "../config/db.js";

const InterventionTypeModel = dbInstance.define("interventionType", {
  idInterventionType: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  interventionType: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
});

export { InterventionTypeModel };
