
import Questionnaire  from "../../models/questionnaire.js";

// Controller to handle saving questionnaire data
export const saveQuestionnaire = async (req, res) => {
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


