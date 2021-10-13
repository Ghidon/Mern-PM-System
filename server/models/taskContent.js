import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  title: String,
  description: String,
  creator: String,
  selectedFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const TaskContent = mongoose.model("TaskContent", taskSchema);

export default TaskContent;
