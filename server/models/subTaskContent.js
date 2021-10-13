import mongoose from "mongoose";

const subTaskSchema = mongoose.Schema({
  title: String,
  description: String,
  creator: String,
  selectedFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const SubTaskContent = mongoose.model("SubTaskContent", subTaskSchema);

export default SubTaskContent;
