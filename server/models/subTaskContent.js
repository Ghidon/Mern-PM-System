import mongoose from "mongoose";

const subTaskSchema = mongoose.Schema({
  projectId: Number,
  taskId: Number,
  creator: String,
  title: String,
  description: String,
  active: Boolean,
  selectedFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const SubTaskContent = mongoose.model("SubTaskContent", subTaskSchema);

export default SubTaskContent;
