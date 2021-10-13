import SubTaskContent from "../models/subTaskContent.js";

export const getSubTasks = async (req, res) => {
  try {
    const subTaskContents = await SubTaskContent.find();

    res.status(200).json(subTaskContents);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createSubTask = async (req, res) => {
  const subTask = req.body;

  const newSubTask = new SubTaskContent(subTask);

  try {
    await newSubTask.save();
    res.status(201).json(newSubTask);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
