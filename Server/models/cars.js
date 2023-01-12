import Sequelize from "sequelize";
import { dbInstance } from "../config/db.js";
import { UserModel } from "./users.js";

const CarsModel = dbInstance.define("cars", {
  idCarro: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  idUser: {
    type: Sequelize.INTEGER,
    allowNull: false,

    references: {
      model: UserModel,
      key: "idUser",
    },
  },
  nome: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  marca: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  kilometragem: {
    type: Sequelize.INTEGER(50),
    allowNull: false,
  },
});
CarsModel.belongsTo(UserModel, { foreignKey: "idUser" });
export { CarsModel };
