import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  creator: String,
  title: String,
  description: String,
  selectedFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const ProjectContent = mongoose.model("ProjectContent", projectSchema);

export default ProjectContent;
