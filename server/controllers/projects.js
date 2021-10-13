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
