import express from "express";
import {
  createTherapist,
  getAllTherapists,
  getTherapistById,
  updateTherapist,
  deleteTherapist,
} from "../../controllers/therapy/therapistController.js";
// import {  } from "../../middleware/admin-middleware.js";

const router = express.Router();

router.post("/", createTherapist); // Create a new therapist
router.get("/",  getAllTherapists); // Get all therapists
router.get("/:id", getTherapistById); // Get a therapist by ID
router.put("/:id", updateTherapist); // Update a therapist by ID
router.delete("/:id", deleteTherapist); // Delete a therapist by ID

export default router;
