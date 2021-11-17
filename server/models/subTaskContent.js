import mongoose from "mongoose";

const subTaskSchema = mongoose.Schema({
  taskId: String,
  creator: String,
  name: String,
  title: String,
  description: String,
  active: Boolean,
  status: String,
  assigned: String,
  dueDate: Date,
  attachedFiles: Array,
  allowedUsers: Array,
  priority: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const SubTaskContent = mongoose.model("SubTaskContent", subTaskSchema);

export default SubTaskContent;
