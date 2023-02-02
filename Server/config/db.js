import Sequelize from "sequelize";
import "dotenv/config.js";

const dbInstance = new Sequelize({
  host: "sql8.freesqldatabase.com",
  port: 3306,
  username: "sql8591672",
  password: process.env.DB_PASSWORD,
  database: "sql8591672",
  dialect: "mysql",
});
// const dbInstance = new Sequelize({
//   host: "localhost",
//   port: 3306,
//   username: "root",
//   password: "",
//   database: "carctrl",
//   dialect: "mysql",
// });

export { dbInstance };
