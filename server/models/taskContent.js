import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  projectId: String,
  creator: String,
  title: String,
  description: String,
  active: Boolean,
  status: String,
  selectedFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const TaskContent = mongoose.model("TaskContent", taskSchema);

export default TaskContent;
