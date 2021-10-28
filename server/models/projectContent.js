import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  creator: String,
  name: String,
  title: String,
  description: String,
  active: Boolean,
  selectedFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const ProjectContent = mongoose.model("ProjectContent", projectSchema);

export default ProjectContent;
