import Therapist from "../models/therapistModel.js";

// Create a new therapist
export const createTherapist = async (req, res) => {
  try {
    const therapist = new Therapist(req.body); // Get data from the request body
    console.log(therapist);
    await therapist.save(); // Save the new therapist to the database
    res.status(201).json({
      success: true,
      message: "Therapist created successfully",
      therapist,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log(error);
  }
};

// Get a list of all therapists
export const getAllTherapists = async (req, res) => {
  try {
    const therapists = await Therapist.find(); // Fetch all therapists
    res.status(200).json({ success: true, count: therapists.length, therapists });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a therapist by ID
export const getTherapistById = async (req, res) => {
  try {
    const therapist = await Therapist.findById(req.params.id);
    if (!therapist) {
      return res
        .status(404)
        .json({ success: false, message: "Therapist not found" });
    }
    res.status(200).json({ success: true, therapist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a therapist's information
export const updateTherapist = async (req, res) => {
  try {
    const therapist = await Therapist.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!therapist) {
      return res
        .status(404)
        .json({ success: false, message: "Therapist not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Therapist updated successfully",
        therapist,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a therapist
export const deleteTherapist = async (req, res) => {
  try {
    const therapist = await Therapist.findByIdAndDelete(req.params.id);
    if (!therapist) {
      return res
        .status(404)
        .json({ success: false, message: "Therapist not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Therapist deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
