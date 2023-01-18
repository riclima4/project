import Sequelize from "sequelize";
import { dbInstance } from "../config/db.js";
import { CarsModel } from "./cars.js";
import { UserModel } from "./users.js";

const IntervencaoModel = dbInstance.define("intervencao", {
  idIntervencao: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  //FK idCarro
  idCarro: {
    type: Sequelize.INTEGER,
    references: {
      model: CarsModel,
      key: "idCarro",
    },
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  idUser: {
    type: Sequelize.INTEGER,
    references: {
      model: UserModel,
      key: "idUser",
    },
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  data: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.NOW,
  },
  kilometragem: {
    type: Sequelize.INTEGER(50),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.FLOAT(),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: 0,
  },
});
IntervencaoModel.belongsTo(CarsModel, {
  foreignKey: "idCarro",
});
IntervencaoModel.belongsTo(UserModel, {
  foreignKey: "idUser",
});
export { IntervencaoModel };
