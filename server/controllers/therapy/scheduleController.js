import Schedule from "../../models/scheduleModel.js";


// Create a new scheduling entry
export const createSchedule = async (req, res) => {
  try {
    const newSchedule = new Schedule(req.body);
    await newSchedule.save();
    res
      .status(201)
      .json({ message: "Schedule created successfully", newSchedule });
  } catch (error) {
    res.status(500).json({ message: "Failed to create schedule", error });
  }
};


// Get all schedules
export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch schedules", error });
  }
};



// Get a schedule by its ID
export const getScheduleById = async (req, res) => {
  const { id } = req.params;
  try {
    const schedule = await Schedule.findById(id);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch schedule", error });
  }
};




// Update a schedule by ID
export const updateSchedule = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedSchedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.status(200).json({ message: "Schedule updated successfully", updatedSchedule });
  } catch (error) {
    res.status(500).json({ message: "Failed to update schedule", error });
  }
};



// Delete a schedule by ID
export const deleteSchedule = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSchedule = await Schedule.findByIdAndDelete(id);
    if (!deletedSchedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }
    res.status(200).json({ message: "Schedule deleted successfully", deletedSchedule });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete schedule", error });
  }
};
