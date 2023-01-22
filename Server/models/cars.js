import Sequelize from "sequelize";
import { dbInstance } from "../config/db.js";
import { YearModel } from "./anos.js";
import { GastTypeModel } from "./gasType.js";
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
  ano: {
    type: Sequelize.INTEGER,
    allowNull: false,

    references: {
      model: YearModel,
      key: "idYear",
    },
  },
  gas: {
    type: Sequelize.INTEGER,
    allowNull: false,

    references: {
      model: GastTypeModel,
      key: "idGasType",
    },
  },
});
CarsModel.belongsTo(UserModel, {
  foreignKey: "idUser",
  as: "user",
});
CarsModel.belongsTo(GastTypeModel, {
  foreignKey: "gas",
  as: "gasType",
});
CarsModel.belongsTo(YearModel, {
  foreignKey: "ano",
  as: "yearType",
});
// CarsModel.hasOne(YearModel, { foreignKey: "idYear" });
// CarsModel.hasOne(GastTypeModel, { foreignKey: "idGasType" });

export { CarsModel };
