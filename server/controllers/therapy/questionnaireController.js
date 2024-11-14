
const Questionnaire = require("../../models/questionnaire");

// Controller to handle saving questionnaire data
const saveQuestionnaire = async (req, res) => {
  try {
    const newQuestionnaire = new Questionnaire(req.body);
    await newQuestionnaire.save();
    res
      .status(201)
      .json({
        message: "Form data saved successfully",
        data: newQuestionnaire,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving form data", error: error.message });
  }
};

module.exports = { saveQuestionnaire };
