
const express = require("express");
const { saveQuestionnaire } = require("../controllers/questionnaireController");
const router = express.Router();

router.post("/questionnaire", saveQuestionnaire);

module.exports = router;
