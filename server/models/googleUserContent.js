import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  googleId: { type: String, required: true },
  name: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  avatar: { type: String },
  email: { type: String, required: true },
  id: { type: String },
});

const GoogleUserContent = mongoose.model("googleUsers", userSchema);

export default GoogleUserContent;
