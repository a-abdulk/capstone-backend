const { DataTypes } = require("sequelize");
const db = require("../db/db"); // Import the Sequelize connection

// Define the User model
const User = db.define("User", {
  userID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, // In a real project, you'd hash passwords
  },
});

export default User;