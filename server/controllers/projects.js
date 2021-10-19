import mongoose from "mongoose";
import ProjectContent from "../models/projectContent.js";

export const getProjects = async (req, res) => {
  try {
    const projectContents = await ProjectContent.find();

    res.status(200).json(projectContents);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  const project = req.body;

  const newProject = new ProjectContent(project);

  try {
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  const { id: _id } = req.params;
  const project = req.body;

  // check if the id is valid on mongoose
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No project with that id");

  const updatedProject = await ProjectContent.findByIdAndUpdate(
    _id,
    { ...project, _id },
    {
      new: true,
    }
  );

  res.json(updatedProject);
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No project with that id");

  await ProjectContent.findByIdAndDelete(id);

  res.json({ message: "Project Deleted Successfully" });
};

export const getProject = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No project with that id");
  try {
    const getProject = await ProjectContent.findById(_id);

    res.status(200).json(getProject);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
