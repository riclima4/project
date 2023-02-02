import Sequelize from "sequelize";
import { dbInstance } from "../config/db.js";
import { CarsModel } from "./cars.js";
import { InterventionTypeModel } from "./interventionType.js";
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
  type: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: InterventionTypeModel,
      key: "idInterventionType",
    },
  },
});
IntervencaoModel.belongsTo(CarsModel, {
  foreignKey: "idCarro",
  as: "carro",
});
// IntervencaoModel.hasOne(InterventionTypeModel, {
//   foreignKey: "idInterventionType",
//   as: "intType",
// });
IntervencaoModel.belongsTo(InterventionTypeModel, {
  foreignKey: "type",
  as: "intType",
});
export { IntervencaoModel };
