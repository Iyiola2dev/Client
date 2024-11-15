import Questionnaire from "../../models/questionnaire.js";

// Controller to handle saving questionnaire data (POST)
export const saveQuestionnaire = async (req, res) => {
  try {
    const newQuestionnaire = new Questionnaire(req.body);
    await newQuestionnaire.save();
    res.status(201).json({
      message: "Form data saved successfully",
      data: newQuestionnaire,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving form data", error: error.message });
  }
};

// Controller to retrieve all questionnaires (GET)
export const getAllQuestionnaires = async (req, res) => {
  try {
    const questionnaires = await Questionnaire.find(); // Fetch all questionnaires from the database
    res.status(200).json({
      message: "Questionnaires retrieved successfully",
      data: questionnaires,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error retrieving questionnaires",
        error: error.message,
      });
  }
};

// Controller to retrieve a specific questionnaire by ID (GET)
export const getQuestionnaireById = async (req, res) => {
  const { id } = req.params; // Extract the id from the request parameters
  try {
    const questionnaire = await Questionnaire.findById(id); // Find the questionnaire by ID
    if (!questionnaire) {
      return res.status(404).json({ message: "Questionnaire not found" });
    }
    res.status(200).json({
      message: "Questionnaire retrieved successfully",
      data: questionnaire,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error retrieving questionnaire",
        error: error.message,
      });
  }
};

// Controller to update an existing questionnaire (PUT)
export const updateQuestionnaire = async (req, res) => {
  const { id } = req.params; // Extract the id from the request parameters
  try {
    const updatedQuestionnaire = await Questionnaire.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedQuestionnaire) {
      return res.status(404).json({ message: "Questionnaire not found" });
    }
    res.status(200).json({
      message: "Questionnaire updated successfully",
      data: updatedQuestionnaire,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating questionnaire", error: error.message });
  }
};

// Controller to delete a questionnaire (DELETE)
export const deleteQuestionnaire = async (req, res) => {
  const { id } = req.params; // Extract the id from the request parameters
  try {
    const deletedQuestionnaire = await Questionnaire.findByIdAndDelete(id); // Delete the questionnaire by ID
    if (!deletedQuestionnaire) {
      return res.status(404).json({ message: "Questionnaire not found" });
    }
    res.status(200).json({
      message: "Questionnaire deleted successfully",
      data: deletedQuestionnaire,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting questionnaire", error: error.message });
  }
};
