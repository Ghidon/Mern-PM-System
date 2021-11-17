import mongoose from "mongoose";
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

  const newSubTask = new SubTaskContent({
    ...subTask,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newSubTask.save();
    res.status(201).json(newSubTask);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateSubTask = async (req, res) => {
  const { id: _id } = req.params;
  const subtask = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No SubTask with that id");

  const updatedSubTask = await SubTaskContent.findByIdAndUpdate(
    _id,
    { ...subtask, _id },
    {
      new: true,
    }
  );

  res.json(updatedSubTask);
};

export const deleteSubTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No SubTask with that id");

  await SubTaskContent.findByIdAndDelete(id);

  res.json({ message: "SubTask Deleted Successfully" });
};

export const getSubTask = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No SubTask with that id");
  try {
    const getSubTask = await SubTaskContent.findById(_id);

    res.status(200).json(getSubTask);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
