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
  idTipoIntervencao: {
    type: Sequelize.INTEGER,
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
  // //FK NIF
  NIF: {
    type: Sequelize.INTEGER(9),
    references: {
      model: UserModel,
      key: "NIF",
    },
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  data: {
    type: Sequelize.DATEONLY,
  },
  kilometragem: {
    type: Sequelize.INTEGER(50),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});
IntervencaoModel.belongsTo(CarsModel, {
  foreignKey: "idCarro",
});
IntervencaoModel.hasOne(UserModel, {
  foreignKey: "NIF",
});
export { IntervencaoModel };
