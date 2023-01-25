import Sequelize from "sequelize";
import { dbInstance } from "../config/db.js";
import { MarcasModel } from "./marcas.js";

const ModeloModel = dbInstance.define("modelo", {
  idModelo: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  idMarca: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: MarcasModel,
      key: "idMarca",
    },
  },
  modelo: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
});
ModeloModel.belongsTo(MarcasModel, {
  foreignKey: "idMarca",
  as: "marcaType",
});
export { ModeloModel };
