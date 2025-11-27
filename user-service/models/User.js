const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Name cannot be empty" }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: "Email format is invalid" }
    }
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "customer",
    validate: {
      isIn: {
        args: [["customer", "seller", "admin"]],
        msg: "Role must be customer/seller/admin"
      }
    }
  }
});

module.exports = User;
