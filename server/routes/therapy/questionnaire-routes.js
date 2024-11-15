
import express from "express";
import {
  saveQuestionnaire,
  getAllQuestionnaires,
  getQuestionnaireById,
  updateQuestionnaire,
  deleteQuestionnaire,
} from "../../controllers/therapy/questionnaireController.js";
const router = express.Router();


// POST - Save a new questionnaire
router.post("/", saveQuestionnaire);

// GET - Retrieve all questionnaires
router.get("/", getAllQuestionnaires);

// GET - Retrieve a specific questionnaire by ID
router.get("/:id", getQuestionnaireById);

// PUT - Update a specific questionnaire by ID
router.put("/:id", updateQuestionnaire);

// DELETE - Delete a specific questionnaire by ID
router.delete("/:id", deleteQuestionnaire);

export default router;
