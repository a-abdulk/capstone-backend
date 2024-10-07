import { Sequelize } from "sequelize";
import LastCommunicationTimeModel from "./models/lastComunicationTime";
import SensorDataModel from "./models/sensorData";
import SystemLogModel from "./models/systemLogs";
import UserModel from "./models/user";
import DeviceModel from "./models/device";

// Set up the Sequelize instance to connect to PostgreSQL
const db = new Sequelize("iotica", "anwarabdulkadir", "Boomman2121.", {
  host: "localhost", // Or your Supabase/Postgres host
  logging: false, // Disable logging for production
});

// Initialize models
const Device = DeviceModel(db);
const LastCommunicationTime = LastCommunicationTimeModel(db);
const SensorData = SensorDataModel(db);
const SystemLogs = SystemLogModel(db);
const User = UserModel(db);

// Test database connection
const testConnection = async () => {
  try {
    await db.authenticate();
    console.log("Connected to the database.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Connect to the database and set up initial data
const connectToDB = async () => {
  try {
    await db.authenticate();
    console.log("DB connected");

    await db.sync();

    // Initialize Users
    const existingUsers = await User.findAll();
    if (existingUsers.length === 0) {
      await User.bulkCreate([
        { name: "Max" },
        { name: "Joe" },
        { name: "Teri" },
      ]);
    }

    // Define relationships
    Device.hasMany(SensorData, { foreignKey: "device_id" });
    SensorData.belongsTo(Device, { foreignKey: "device_id" });
    Device.hasMany(Command, { foreignKey: "device_id" });
    Command.belongsTo(Device, { foreignKey: "device_id" });
    Device.hasOne(LastCommunicationTime, { foreignKey: "device_id" });
    LastCommunicationTime.belongsTo(Device, { foreignKey: "device_id" });
  } catch (err) {
    console.error("DB failure:", err);
  }
};

// Run connection tests and initialization
testConnection();
connectToDB();

// Export database and models
export { db, Device, User, SensorData, SystemLogs, LastCommunicationTime };
