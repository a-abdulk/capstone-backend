const express = require("express");
const Device = require("../models/Device"); // Import Device model
const router = express.Router();

// Create a new IoT device
router.post("/", async (req, res) => {
  try {
    const newDevice = await Device.create(req.body);
    res.status(201).json(newDevice);
  } catch (error) {
    console.error("Error creating device:", error);
    res.status(500).json({ error: "Error creating device" });
  }
});

// Get all devices
router.get("/", async (req, res) => {
  try {
    const devices = await Device.findAll();
    res.status(200).json(devices);
  } catch (error) {
    console.error("Error fetching devices:", error);
    res.status(500).json({ error: "Error fetching devices" });
  }
});

// Get a device by ID
router.get("/:id", async (req, res) => {
  try {
    const device = await Device.findByPk(req.params.id);
    if (!device) {
      return res.status(404).json({ error: "Device not found" });
    }
    res.status(200).json(device);
  } catch (error) {
    console.error("Error fetching device:", error);
    res.status(500).json({ error: "Error fetching device" });
  }
});

// Update a device
router.put("/:id", async (req, res) => {
  try {
    const device = await Device.findByPk(req.params.id);
    if (!device) {
      return res.status(404).json({ error: "Device not found" });
    }
    const updatedDevice = await device.update(req.body);
    res.status(200).json(updatedDevice);
  } catch (error) {
    console.error("Error updating device:", error);
    res.status(500).json({ error: "Error updating device" });
  }
});

// Delete a device
router.delete("/:id", async (req, res) => {
  try {
    const deletedDevice = await Device.destroy({
      where: { deviceID: req.params.id },
    });
    if (!deletedDevice) {
      return res.status(404).json({ error: "Device not found" });
    }
    res.status(200).json({ message: "Device deleted" });
  } catch (error) {
    console.error("Error deleting device:", error);
    res.status(500).json({ error: "Error deleting device" });
  }
});

export default router;
