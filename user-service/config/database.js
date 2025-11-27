const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("userdb", "root", "", {
  host: "localhost",
  dialect: "mysql"
});

sequelize.authenticate()
  .then(() => console.log("Database connected"))
  .catch(err => console.log("DB Error:", err));

module.exports = sequelize;
