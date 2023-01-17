import Sequelize from "sequelize";
import { dbInstance } from "../config/db.js";

const UserModel = dbInstance.define("users", {
  idUser: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING(),
    allowNull: false,
  },
  type: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});
export { UserModel };
