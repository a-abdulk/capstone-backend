const { DataTypes } = require('sequelize');
const db = require('../db/db'); // Import database connection

// Define the Device model (lving on south cmaous)
const Device = db.define('Device', {
  deviceID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  deviceName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deviceType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Active',
  },
});

export default Device;

