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
      onDelete: "CASCADE",
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
  modelo: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  motor: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  kilometragem: {
    type: Sequelize.INTEGER(50),
    allowNull: false,
    defaultValue: 0,
  },
  ano: {
    type: Sequelize.INTEGER(4),
    allowNull: false,
    defaultValue: 0,
  },
  gasType: {
    type: Sequelize.TEXT(),
    allowNull: false,
  },
});
// UserModel.hasMany(CarsModel, { foreignKey: "idUser" });
CarsModel.belongsTo(UserModel, {
  foreignKey: "idUser",
  as: "user",
});
export { CarsModel };
