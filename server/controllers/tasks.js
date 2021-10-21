import mongoose from "mongoose";
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

export const updateTask = async (req, res) => {
  const { id: _id } = req.params;
  const task = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Task with that id");

  const updatedTask = await TaskContent.findByIdAndUpdate(
    _id,
    { ...task, _id },
    {
      new: true,
    }
  );

  res.json(updatedTask);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Task with that id");

  await TaskContent.findByIdAndDelete(id);

  res.json({ message: "Task Deleted Successfully" });
};

export const getTask = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Task with that id");
  try {
    const getTask = await TaskContent.findById(_id);

    res.status(200).json(getTask);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
