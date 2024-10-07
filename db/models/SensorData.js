// handles sensor data and other pramerter

module.exports = (sequelize, DataTypes) => {
    const SensorData = sequelize.define('SensorData', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      device_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      timestamp: {
        type: DataTypes.STRING,
        allowNull: false
      },
      temperature: {
        type: DataTypes.STRING,
        allowNull: true
      },
      humidity: {
        type: DataTypes.STRING,
        allowNull: true
      },
      other_data: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      timestamps: false,
      tableName: 'SensorData'
    });
  
    return SensorData;
  };
  
  export default SensorData;