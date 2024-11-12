import express from "express";
import {
  createTherapist,
  getAllTherapists,
  getTherapistById,
  updateTherapist,
  deleteTherapist,
} from "../controllers/therapistController.js";
import {
  validateTherapist,
} from "../middleware/therapist-middleware.js";

const router = express.Router();

router.post(
  "/",
  validateTherapist,
  createTherapist
); // Create a new therapist
router.get("/",  getAllTherapists); // Get all therapists
router.get("/:id", getTherapistById); // Get a therapist by ID
router.put(
  "/:id",
  updateTherapist
); // Update a therapist by ID
router.delete("/:id", validateTherapist, deleteTherapist); // Delete a therapist by ID

export default router;
