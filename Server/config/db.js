import Sequelize from "sequelize";
const dbInstance = new Sequelize({
  host: "sql8.freesqldatabase.com",
  port: 3306,
  username: "sql8591672",
  password: "QGy5zsXJCw",
  database: "sql8591672",
  dialect: "mysql",
});

export { dbInstance };
