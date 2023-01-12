import Sequelize from "sequelize";
const dbInstance = new Sequelize({
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "carctrl",
  dialect: "mysql",
});

export { dbInstance };
