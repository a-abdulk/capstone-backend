import express from "express";
import cors from "cors";
import { Sequelize } from "sequelize";
import {
  db,
  User,
  Device,
  SystemLogs,
  SensorData,
  Commands,
  //LastCommunicationTime,
} from "./db/models/db.js";
import { op } from "sequelize";
import { validateUserTokenMiddleware } from "./middleware/clerkAuth"; // Import Clerk token validation middleware
import userRoutes from "./routes/userRoutes.js"; // Use ES6 import for user routes
import deviceRoutes from "./routes/deviceRoutes.js"; // Import device routes

const server = express();
server.use(cors());
server.use(express.json());

// Health check route
server.get("/test", (req, res) => {
  res.send({ server: "running" });
});

// User Routes
server.use("/api/users", userRoutes); // Assuming you have user routes defined

// Device Routes
server.use("/api/devices", deviceRoutes); // Use the device routes for device-related endpoints

// Commands Routes
server.get("/commands", async (req, res) => {
  try {
    const commands = await Commands.findAll();
    res.json(commands);
  } catch (error) {
    res.status(500).json({ message: "Error fetching commands", error });
  }
});

// Create a new command
server.post("/commands", async (req, res) => {
  try {
    const { id, device_id, command, issued_at, status } = req.body;
    const newCommand = await Commands.create({
      id,
      device_id,
      command,
      issued_at,
      status,
    });
    res.status(201).json(newCommand);
  } catch (error) {
    res.status(500).json({ message: "Error creating command", error });
  }
});

// Get a command by ID
server.get("/commands/:id", async (req, res) => {
  try {
    const command = await Commands.findByPk(req.params.id);
    if (!command) {
      return res.status(404).json({ message: "Command not found" });
    }
    res.json(command);
  } catch (error) {
    res.status(500).json({ message: "Error fetching command", error });
  }
});

// Syncing database models
db.sync()
  .then(() => {
    console.log("Database synced successfully");
    server.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Failed to sync database:", error);
  });

// Example Device Routes
server.post("/devices", async (req, res) => {
  try {
    const newDevice = await Device.create(req.body);
    res.status(201).json(newDevice); // Send the created device back with a 201 status
  } catch (error) {
    res.status(500).json({ message: "Error creating device", error });
  }
});

server.get("/devices", async (req, res) => {
  try {
    const devices = await Device.findAll();
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching devices", error });
  }
});

server.get("/devices/:id", async (req, res) => {
  try {
    const device = await Device.findByPk(req.params.id);
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    res.status(200).json(device);
  } catch (error) {
    res.status(500).json({ message: "Error fetching device", error });
  }
});

server.put("/devices/:id", async (req, res) => {
  try {
    const { name, type, location, status } = req.body;
    const device = await Device.findByPk(req.params.id);
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    await device.update({ name, type, location, status });
    res.status(200).json({ message: "Device updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating device", error });
  }
});

server.delete("/devices/:id", async (req, res) => {
  try {
    const device = await Device.findByPk(req.params.id);
    if (!device) {
      return res.status(404).json({ message: "Device not found" });
    }
    await device.destroy();
    res.status(200).json({ message: "Device deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting device", error });
  }
});
