import Questionnaire from "../../models/questionnaire.js";

// Controller to handle saving questionnaire data (POST)
export const saveQuestionnaire = async (req, res) => {
  try {
    // Destructure required fields from the request body
    const {
      therapistId,
      userId,
      accountName,
      phone,
      email,
      brings,
      emotion,
      achieve,
      sought,
      other,
    } = req.body;

    // Validate that therapistId and userId are provided
    if (!therapistId || !userId) {
      console.error("Missing therapistId or userId in request body:", req.body);
      return res
        .status(400)
        .json({ message: "Therapist ID and User ID are required" });
    }

    // Validate other required fields if necessary
    if (!accountName || !email) {
      console.error("Missing accountName or email in request body:", req.body);
      return res
        .status(400)
        .json({ message: "Account Name and Email are required" });
    }

    // Create a new questionnaire entry with the provided data
    const newQuestionnaire = new Questionnaire({
      therapistId,
      userId,
      accountName,
      phone,
      email,
      brings,
      emotion,
      achieve,
      sought,
      other,
    });

    // Save the new questionnaire to the database
    await newQuestionnaire.save();

    // Return a successful response
    res.status(201).json({
      message: "Questionnaire saved successfully",
      newQuestionnaire,
    });
  } catch (error) {
    console.error("Error while saving questionnaire:", error.message);
    res
      .status(500)
      .json({ message: "Failed to save questionnaire", error: error.message });
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
