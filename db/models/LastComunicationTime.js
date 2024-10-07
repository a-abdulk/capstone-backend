// This model stores the last ommunication fror each device

module.exports = (sequelize, DataTypes) => {
    const LastCommunicationTime = sequelize.define('LastCommunicationTime', {
      device_id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      last_communication_time: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      timestamps: false,
      tableName: 'LastCommunicationTime'
    });
  
    return LastCommunicationTime;
  };
  
  export default LastCommunicationTime;
