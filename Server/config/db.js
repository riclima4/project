import Sequelize from "sequelize";
// CREATE USER 'ricardo'@'%' IDENTIFIED BY 'password';
// GRANT ALL PRIVILEGES ON * . * TO 'ricardo'@'%';
const dbInstance = new Sequelize({
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "carctrl",
  dialect: "mysql",
});

export { dbInstance };
