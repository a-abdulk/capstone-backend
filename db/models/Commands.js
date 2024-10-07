// This modle will be repbresint ghte ocmmands tale strings commabds to the devics
import { DataTypes } from "sequelize";
module.exports = (sequelize, DataTypes) => {
  const Command = sequelize.define(
    "Command",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      device_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      command: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      issued_at: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "Commands",
    }
  );

  return Command;
};

export default Command;