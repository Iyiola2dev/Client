
// routes/scheduleRoutes.js
import express from "express";
import { createSchedule, deleteSchedule, getAllSchedules, getScheduleById, updateSchedule } from "../../controllers/therapy/scheduleController.js";


const router = express.Router();

router.post("/", createSchedule); // Create a new schedule
router.get("/", getAllSchedules); // Get all schedules
router.get("//:id", getScheduleById); // Get a schedule by ID
router.put("/:id", updateSchedule); // Update a schedule by ID
router.delete("/:id", deleteSchedule); // Delete a schedule by ID

export default router;
