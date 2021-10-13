import TaskContent from "../models/taskContent.js";

export const getTasks = async (req, res) => {
  try {
    const taskContents = await TaskContent.find();

    res.status(200).json(taskContents);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  const task = req.body;

  const newTask = new TaskContent(task);

  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
