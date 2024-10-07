// Handles system logs, campuiting various messages and log types

// models/systemLogs.js
module.exports = (sequelize, DataTypes) => {
    const SystemLogs = sequelize.define('SystemLogs', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      log_type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false
      },
      created_at: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      timestamps: false,
      tableName: 'SystemLogs'
    });
  
    return SystemLogs;
  };
  
export default SystemLogs;