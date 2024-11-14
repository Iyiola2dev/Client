
import express from "express";
import { saveQuestionnaire } from "../../controllers/therapy/questionnaireController.js";
const router = express.Router();

router.post("/questionnaire", saveQuestionnaire);

export default router;